import { Bucket } from 'couchbase';

export interface Repository<T> extends Bucket {
  new (): Repository<T>;
  entity: T;

  /**
   * Retrieves a document.
   * @param key The target document key.
   */
  get(key: string | Buffer, options?: any): Promise<T>;
}
