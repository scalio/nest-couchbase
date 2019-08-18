import { Provider } from '@nestjs/common';

import {
  CouchbaseConnectionFactory,
  CouchbaseRepositoryFactory,
  CouchbaseConnectionConfig,
} from '../couchbase';
import { CouchbaseModuleAsyncOptions } from './interfaces';
import { getConnectionToken, getModuleOptionsToken, getRepositoryToken } from './utils';

export const createCouchbaseConnectionProviders = (
  config: CouchbaseConnectionConfig,
): Provider[] => [
  {
    provide: getConnectionToken(),
    useFactory: async () => CouchbaseConnectionFactory.create(config),
  },
];

export const createCouchbaseAsyncConnectionProviders = (
  options: CouchbaseModuleAsyncOptions,
): Provider[] => [
  {
    provide: getModuleOptionsToken(),
    useFactory: options.useFactory,
    inject: options.inject || [],
  },
  {
    provide: getConnectionToken(),
    useFactory: async (config: CouchbaseConnectionConfig) =>
      CouchbaseConnectionFactory.create(config),
    inject: [getModuleOptionsToken()],
  },
];

export const createCouchbaseRepositoryProvider = (entity: Function): Provider => ({
  provide: getRepositoryToken(entity),
  useFactory: async (conn: CouchbaseConnectionFactory) =>
    CouchbaseRepositoryFactory.create(conn, entity),
  inject: [getConnectionToken()],
});

export const createCouchbaseProviders = (entities: Function[]): Provider[] =>
  entities.map(createCouchbaseRepositoryProvider);
