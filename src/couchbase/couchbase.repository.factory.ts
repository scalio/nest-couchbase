import { Cluster } from 'couchbase';

import { CouchbaseConnectionConfig, Repository } from './interfaces';
import { CouchbaseException } from './exceptions';
import { CouchbaseConnectionFactory } from './couchbase.connection.factory';
import { CouchbaseRepositoryMixin } from './couchbase.repository.mixin';
import { getEntityMetadata } from './couchbase.utils';

export class CouchbaseRepositoryFactory {
  constructor(private cluster: Cluster, private config: CouchbaseConnectionConfig) {}

  static create(
    cluster: Cluster,
    config: CouchbaseConnectionConfig,
  ): CouchbaseRepositoryFactory {
    return new CouchbaseRepositoryFactory(cluster, config);
  }

  async create<T>(entity: T): Promise<Repository<T>> {
    const name = this.getBucketName(entity);
    const bucket = await CouchbaseConnectionFactory.getBucket(this.cluster, {
      ...this.config,
      bucket: name,
    });
    const repo = new (CouchbaseRepositoryMixin<T>(bucket, entity))();
    Object.assign(repo, bucket);
    return repo;
  }

  private getBucketName(entity: any): string {
    const name = getEntityMetadata(entity);

    if (!name) {
      throw new CouchbaseException('Invalid bucket name in @Entity decorator');
    }

    return name;
  }
}
