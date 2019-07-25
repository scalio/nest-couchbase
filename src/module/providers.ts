import { Cluster } from 'couchbase';
import { Provider } from '@nestjs/common';

import {
  CouchbaseConnectionFactory,
  CouchbaseRepositoryFactory,
  CouchbaseConnectionConfig,
} from '../couchbase';
import { getClusterToken, getRepositoryFactoryToken, getRepositoryToken } from './utils';

export const createCouchbaseConnectionProviders = (
  config: CouchbaseConnectionConfig,
): Provider[] => [
  {
    provide: getClusterToken(),
    useFactory: async () => CouchbaseConnectionFactory.createCluster(config),
  },
  {
    provide: getRepositoryFactoryToken(),
    useFactory: (cluster: Cluster) => CouchbaseRepositoryFactory.create(cluster, config),
    inject: [getClusterToken()],
  },
];

export const createCouchbaseRepositoryProvider = (entity: Function): Provider => ({
  provide: getRepositoryToken(entity),
  useFactory: async (repositoryFactory: CouchbaseRepositoryFactory) =>
    repositoryFactory.create(entity),
  inject: [getRepositoryFactoryToken()],
});

export const createCouchbaseProviders = (entities: Function[]): Provider[] =>
  entities.map(createCouchbaseRepositoryProvider);
