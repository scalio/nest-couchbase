import { COUCHBASE_ENTITY_METADATA } from './couchbase.constants';

export const getEntityMetadata = <T = any>(entity: T): string =>
  Reflect.getMetadata(COUCHBASE_ENTITY_METADATA, entity);
