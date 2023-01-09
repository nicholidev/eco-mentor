import { CreateAssetInput, DeleteAssetInput, UpdateAssetInput } from '@ecomentor/common/lib/generated-types';
import { ID } from '@ecomentor/common/lib/shared-types';

import { RequestContext } from '../../api';
import { Asset } from '../../entity';
import { EcomentorEntityEvent } from '../ecomentor-entity-event';

type AssetInputTypes = CreateAssetInput | UpdateAssetInput | DeleteAssetInput | ID;

/**
 * @description
 * This event is fired whenever a {@link Asset} is added, updated or deleted.
 *
 * @docsCategory events
 * @docsPage Event Types
 * @since 1.4
 */
export class AssetEvent extends EcomentorEntityEvent<Asset, AssetInputTypes> {
    constructor(
        ctx: RequestContext,
        entity: Asset,
        type: 'created' | 'updated' | 'deleted',
        input?: AssetInputTypes,
    ) {
        super(entity, type, ctx, input);
    }

    /**
     * Return an asset field to become compatible with the
     * deprecated old version of AssetEvent
     * @deprecated Use `entity` instead
     * @since 1.4
     */
    get asset(): Asset {
        return this.entity;
    }
}
