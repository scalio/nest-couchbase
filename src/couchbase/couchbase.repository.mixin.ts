import { promisify } from 'util';
import { Bucket } from 'couchbase';
import * as BucketClass from 'couchbase/lib/bucket';

import { Repository } from './interfaces';

export function CouchbaseRepositoryMixin<T>(bucket: Bucket, entity: T): Repository<T> {
  class CouchbaseRepository {
    entity: T;

    constructor() {
      this.entity = entity;
    }

    private get base(): Repository<T> {
      return this as any;
    }
  }

  Object.assign(CouchbaseRepository.prototype, BucketClass.prototype);
  Object.getOwnPropertyNames(BucketClass.prototype).forEach((name: string) => {
    if (
      name !== 'constructor' &&
      typeof CouchbaseRepository.prototype[name] === 'function'
    ) {
      CouchbaseRepository.prototype[name] = promisify(BucketClass.prototype[name]);
    }
  });
  Object.defineProperty(CouchbaseRepository, 'name', {
    writable: false,
    value: `Generated${(entity as any).name}CouchbaseRepository`,
  });

  return CouchbaseRepository as any;
}
