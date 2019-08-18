import { COUCHBASE_CONNECTION_TOKEN, COUCHBASE_MODULE_OPTIONS } from './constants';

export const getConnectionToken = (): string => COUCHBASE_CONNECTION_TOKEN;
export const getModuleOptionsToken = (): string => COUCHBASE_MODULE_OPTIONS;
export const getRepositoryToken = (entity: Function): string =>
  `${entity.name}_REPOSITORY_TOKEN`;
