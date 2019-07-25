import { COUCHBASE_CLUSTER_TOKEN, COUCHBASE_REPOSITORY_FACTORY_TOKEN } from './constants';

export const getClusterToken = (): string => COUCHBASE_CLUSTER_TOKEN;
export const getRepositoryFactoryToken = (): string => COUCHBASE_REPOSITORY_FACTORY_TOKEN;
export const getRepositoryToken = (entity: Function): string =>
  `${entity.name}_REPOSITORY_TOKEN`;
