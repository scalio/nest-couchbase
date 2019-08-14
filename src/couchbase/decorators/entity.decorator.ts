import { COUCHBASE_ENTITY_METADATA } from '../couchbase.constants';

export const Entity = (bucket?: string) => (target: Object) => {
  Reflect.defineMetadata(COUCHBASE_ENTITY_METADATA, bucket, target);
};
