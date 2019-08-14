import { Cluster } from 'couchbase';
import { Provider } from '@nestjs/common';

import {
  CouchbaseConnectionFactory,
  CouchbaseRepositoryFactory,
  CouchbaseConnectionConfig,
} from '../couchbase';
import { getConnectionToken, getRepositoryToken } from './utils';

export const createCouchbaseConnectionProviders = (
  config: CouchbaseConnectionConfig,
): Provider[] => [
  {
    provide: getConnectionToken(),
    useFactory: async () => CouchbaseConnectionFactory.create(config),
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
