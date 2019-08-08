import { Repository } from './interfaces';
import { CouchbaseException } from './exceptions';
import { CouchbaseConnectionFactory } from './couchbase.connection.factory';
import { CouchbaseRepositoryMixin } from './couchbase.repository.mixin';
import { getEntityMetadata } from './couchbase.utils';

export class CouchbaseRepositoryFactory {
  static async create<T>(
    conn: CouchbaseConnectionFactory,
    entity: T,
  ): Promise<Repository<T>> {
    const bucketName = CouchbaseRepositoryFactory.getBucketName(entity);
    const [err, bucket] = await conn.getBucket(bucketName);
    if (err) {
      throw err;
    }
    return new (CouchbaseRepositoryMixin<T>(bucket, entity))();
  }

  private static getBucketName(entity: any): string {
    const name = getEntityMetadata(entity);
    if (!name) {
      throw new CouchbaseException('Invalid bucket name in @Entity decorator');
    }
    return name;
  }
}
