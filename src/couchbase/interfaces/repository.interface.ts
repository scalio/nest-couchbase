import { Bucket } from 'couchbase';

export interface Repository<T> extends Bucket {
  new (): Repository<T>;
  entity: T;
}
