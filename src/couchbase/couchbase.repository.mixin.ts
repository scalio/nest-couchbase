import { Bucket } from 'couchbase';
import * as BucketClass from 'couchbase/lib/bucket';

import { promisify, flattenPromise } from '../utils';
import { Repository } from './interfaces';

export function CouchbaseRepositoryMixin<T>(bucket: Bucket, entity: T): Repository<T> {
  class CouchbaseRepository {
    entity: T;

    constructor() {
      this.entity = entity;
    }
  }

  Object.assign(CouchbaseRepository.prototype, BucketClass.prototype);
  Object.getOwnPropertyNames(BucketClass.prototype).forEach((name: string) => {
    if (
      name !== 'constructor' &&
      typeof CouchbaseRepository.prototype[name] === 'function'
    ) {
      const method = promisify(BucketClass.prototype[name], bucket);
      CouchbaseRepository.prototype[name] = method;
      CouchbaseRepository.prototype[`${name}Flat`] = flattenPromise(method);
    }
  });
  Object.defineProperty(CouchbaseRepository, 'name', {
    writable: false,
    value: `Generated${(entity as any).name}CouchbaseRepository`,
  });

  return CouchbaseRepository as any;
}
