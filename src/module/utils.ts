import { COUCHBASE_CONNECTION_TOKEN } from './constants';

export const getConnectionToken = (): string => COUCHBASE_CONNECTION_TOKEN;
export const getRepositoryToken = (entity: Function): string =>
  `${entity.name}_REPOSITORY_TOKEN`;
