import { Client } from '@elastic/elasticsearch';
import {
    CatalogModificationEvent,
    CollectionModificationEvent,
    DeepRequired,
    EventBus,
    idsAreEqual,
    Logger,
    OnVendureBootstrap,
    OnVendureClose,
    PluginCommonModule,
    Product,
    ProductVariant,
    TaxRateModificationEvent,
    Type,
    VendurePlugin,
} from '@vendure/core';
import { gql } from 'apollo-server-core';

import { ELASTIC_SEARCH_CLIENT, ELASTIC_SEARCH_OPTIONS, loggerCtx } from './constants';
import { ElasticsearchIndexService } from './elasticsearch-index.service';
import { AdminElasticSearchResolver, ShopElasticSearchResolver } from './elasticsearch-resolver';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchIndexerController } from './indexer.controller';
import { ElasticsearchOptions, mergeWithDefaults } from './options';

const schemaExtension = gql`
    extend type SearchResponse {
        priceRange: SearchResponsePriceRange!
    }

    type SearchResponsePriceRange {
        min: Int!
        minWithTax: Int!
        max: Int!
        maxWithTax: Int!
        buckets: [PriceRangeBucket!]!
        bucketsWithTax: [PriceRangeBucket!]!
    }

    type PriceRangeBucket {
        to: Int!
        count: Int!
    }
`;

/**
 * @description
 * This plugin allows your product search to be powered by [Elasticsearch](https://github.com/elastic/elasticsearch) - a powerful Open Source search
 * engine. This is a drop-in replacement for the DefaultSearchPlugin.
 *
 * ## Installation
 *
 * `yarn add \@vendure/elasticsearch-plugin`
 *
 * or
 *
 * `npm install \@vendure/elasticsearch-plugin`
 *
 * Make sure to remove the `DefaultSearchPlugin` if it is still in the VendureConfig plugins array.
 *
 * Then add the `ElasticsearchPlugin`, calling the `.init()` method with {@link ElasticsearchOptions}:
 *
 * @example
 * ```ts
 * import { ElasticsearchPlugin } from '\@vendure/elasticsearch-plugin';
 *
 * const config: VendureConfig = {
 *   // Add an instance of the plugin to the plugins array
 *   plugins: [
 *     ElasticsearchPlugin.init({
 *       host: 'http://localhost',
 *       port: 9200,
 *     }),
 *   ],
 * };
 * ```
 *
 * ## Search API Extensions
 * This plugin extends the default search API, allowing richer querying of your product data.
 *
 * The [SearchResponse](/docs/graphql-api/admin/object-types/#searchresponse) type is extended with information
 * about price ranges in the result set:
 * ```SDL
 * extend type SearchResponse {
 *     priceRange: SearchResponsePriceRange!
 * }
 *
 * type SearchResponsePriceRange {
 *     min: Int!
 *     minWithTax: Int!
 *     max: Int!
 *     maxWithTax: Int!
 *     buckets: [PriceRangeBucket!]!
 *     bucketsWithTax: [PriceRangeBucket!]!
 * }
 *
 * type PriceRangeBucket {
 *     to: Int!
 *     count: Int!
 * }
 * ```
 *
 * This `SearchResponsePriceRange` type allows you to query data about the range of prices in the result set.
 *
 * ## Example Request & Response
 *
 * ```SDL
 * {
 *   search (input: { term: "table easel", groupByProduct: true }){
 *     totalItems
 *     priceRange {
 *       min
 *       max
 *       buckets {
 *         to
 *         count
 *       }
 *     }
 *     items {
 *       productName
 *       score
 *       price {
 *         ...on PriceRange {
 *           min
 *           max
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * ```JSON
 *{
 *  "data": {
 *    "search": {
 *      "totalItems": 9,
 *      "priceRange": {
 *        "min": 999,
 *        "max": 6396,
 *        "buckets": [
 *          {
 *            "to": 1000,
 *            "count": 1
 *          },
 *          {
 *            "to": 2000,
 *            "count": 2
 *          },
 *          {
 *            "to": 3000,
 *            "count": 3
 *          },
 *          {
 *            "to": 4000,
 *            "count": 1
 *          },
 *          {
 *            "to": 5000,
 *            "count": 1
 *          },
 *          {
 *            "to": 7000,
 *            "count": 1
 *          }
 *        ]
 *      },
 *      "items": [
 *        {
 *          "productName": "Loxley Yorkshire Table Easel",
 *          "score": 30.58831,
 *          "price": {
 *            "min": 4984,
 *            "max": 4984
 *          }
 *        },
 *        // ... truncated
 *      ]
 *    }
 *  }
 *}
 * ```
 *
 * @docsCategory ElasticsearchPlugin
 */
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [
        ElasticsearchIndexService,
        ElasticsearchService,
        { provide: ELASTIC_SEARCH_OPTIONS, useFactory: () => ElasticsearchPlugin.options },
        { provide: ELASTIC_SEARCH_CLIENT, useFactory: () => ElasticsearchPlugin.client },
    ],
    adminApiExtensions: { resolvers: [AdminElasticSearchResolver] },
    shopApiExtensions: { resolvers: [ShopElasticSearchResolver], schema: schemaExtension },
    workers: [ElasticsearchIndexerController],
})
export class ElasticsearchPlugin implements OnVendureBootstrap, OnVendureClose {
    private static options: DeepRequired<ElasticsearchOptions>;
    private static client: Client;

    /** @internal */
    constructor(
        private eventBus: EventBus,
        private elasticsearchService: ElasticsearchService,
        private elasticsearchIndexService: ElasticsearchIndexService,
    ) {}

    /**
     * Set the plugin options.
     */
    static init(options: ElasticsearchOptions): Type<ElasticsearchPlugin> {
        const { host, port } = options;
        this.options = mergeWithDefaults(options);
        this.client = new Client({
            node: `${host}:${port}`,
        });
        return ElasticsearchPlugin;
    }

    /** @internal */
    async onVendureBootstrap(): Promise<void> {
        const { host, port } = ElasticsearchPlugin.options;
        try {
            const pingResult = await this.elasticsearchService.checkConnection();
        } catch (e) {
            Logger.error(`Could not connect to Elasticsearch instance at "${host}:${port}"`, loggerCtx);
            Logger.error(JSON.stringify(e), loggerCtx);
            return;
        }
        Logger.info(`Sucessfully connected to Elasticsearch instance at "${host}:${port}"`, loggerCtx);

        await this.elasticsearchService.createIndicesIfNotExists();

        this.eventBus.subscribe(CatalogModificationEvent, event => {
            if (event.entity instanceof Product || event.entity instanceof ProductVariant) {
                return this.elasticsearchIndexService.updateProductOrVariant(event.ctx, event.entity).start();
            }
        });
        this.eventBus.subscribe(CollectionModificationEvent, event => {
            return this.elasticsearchIndexService
                .updateVariantsById(event.ctx, event.productVariantIds)
                .start();
        });
        this.eventBus.subscribe(TaxRateModificationEvent, event => {
            const defaultTaxZone = event.ctx.channel.defaultTaxZone;
            if (defaultTaxZone && idsAreEqual(defaultTaxZone.id, event.taxRate.zone.id)) {
                return this.elasticsearchService.reindex(event.ctx);
            }
        });
    }

    /** @internal */
    onVendureClose() {
        return ElasticsearchPlugin.client.close();
    }
}
