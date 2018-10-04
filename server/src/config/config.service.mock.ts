import { VendureEntity } from '../entity/base/base.entity';
import { MockClass } from '../testing/testing-types';

import { ConfigService } from './config.service';
import { EntityIdStrategy, PrimaryKeyType } from './entity-id-strategy/entity-id-strategy';

export class MockConfigService implements MockClass<ConfigService> {
    authOptions: {};
    channelTokenKey: 'vendure-token';
    apiPath = 'api';
    port = 3000;
    cors = false;
    defaultLanguageCode: jest.Mock<any>;
    entityIdStrategy = new MockIdStrategy();
    assetNamingStrategy = {} as any;
    assetStorageStrategy = {} as any;
    assetPreviewStrategy = {} as any;
    uploadMaxFileSize = 1024;
    dbConnectionOptions = {};
    adjustmentConditions = [];
    adjustmentActions = [];
    customFields = {};
    middleware = [];
    plugins = [];
}

export const ENCODED = 'encoded';
export const DECODED = 'decoded';

export class MockIdStrategy implements EntityIdStrategy {
    primaryKeyType = 'integer' as any;
    encodeId = jest.fn().mockReturnValue(ENCODED);
    decodeId = jest.fn().mockReturnValue(DECODED);
}
