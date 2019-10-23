import { Repository, CouchbaseBucketConfig } from './interfaces';
import { CouchbaseConnectionFactory } from './couchbase.connection.factory';
import { CouchbaseRepositoryMixin } from './couchbase.repository.mixin';
import { getEntityMetadata } from './couchbase.utils';

export class CouchbaseRepositoryFactory {
  static async create<T>(
    conn: CouchbaseConnectionFactory,
    entity: T,
  ): Promise<Repository<T>> {
    const { name, password } = CouchbaseRepositoryFactory.getBucketConfig(conn, entity);
    const [err, bucket] = await conn.getBucket(name, password);
    if (err) {
      throw err;
    }
    return new (CouchbaseRepositoryMixin<T>(bucket, entity))();
  }

  private static getBucketConfig(
    conn: CouchbaseConnectionFactory,
    entity: any,
  ): CouchbaseBucketConfig {
    const name = getEntityMetadata(entity) || conn.config.defaultBucket.name;
    let password: string;

    if (name === conn.config.defaultBucket.name) {
      password = conn.config.defaultBucket.password;
    } else if (Array.isArray(conn.config.buckets) && conn.config.buckets.length) {
      const bucketConfig = conn.config.buckets.find((one) => one.name === name);

      if (bucketConfig) {
        password = bucketConfig.password;
      }
    }

    return { name, password };
  }
}
