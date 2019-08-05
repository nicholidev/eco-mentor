import { Brackets } from 'typeorm';

import { UserInputError } from '../../common/error/errors';

import { CollectionFilter } from './collection-filter';

/**
 * Filters for ProductVariants having the given facetValueIds (including parent Product)
 */
export const facetValueCollectionFilter = new CollectionFilter({
    args: {
        facetValueIds: { type: 'facetValueIds' },
        containsAny: { type: 'boolean' },
    },
    code: 'facet-value-filter',
    description: 'Filter by FacetValues',
    apply: (qb, args) => {
        if (args.facetValueIds.length) {
            qb.leftJoin('productVariant.product', 'product')
                .leftJoin('product.facetValues', 'productFacetValues')
                .leftJoin('productVariant.facetValues', 'variantFacetValues')
                .andWhere(
                    new Brackets(qb1 => {
                        const ids = args.facetValueIds;
                        return qb1
                            .where(`productFacetValues.id IN (:...ids)`, { ids })
                            .orWhere(`variantFacetValues.id IN (:...ids)`, { ids });
                    }),
                )
                .groupBy('productVariant.id')
                .having(`COUNT(1) >= :count`, { count: args.containsAny ? 1 : args.facetValueIds.length });
        } else {
            // If no facetValueIds are specified, no ProductVariants will be matched.
            qb.andWhere('1 = 0');
        }
        return qb;
    },
});

export const variantNameCollectionFilter = new CollectionFilter({
    args: {
        operator: { type: 'string' },
        term: { type: 'string' },
    },
    code: 'variant-name-filter',
    description: 'Filter by ProductVariant name',
    apply: (qb, args) => {
        qb.leftJoin('productVariant.translations', 'translation');
        switch (args.operator) {
            case 'contains':
                return qb.andWhere('translation.name LIKE :term', { term: `%${args.term}%` });
            case 'doesNotContain':
                return qb.andWhere('translation.name NOT LIKE :term', { term: `%${args.term}%` });
            case 'startsWith':
                return qb.andWhere('translation.name LIKE :term', { term: `${args.term}%` });
            case 'endsWith':
                return qb.andWhere('translation.name LIKE :term', { term: `%${args.term}` });
            default:
                throw new UserInputError(`${args.operator} is not a valid operator`);
        }
    },
});
