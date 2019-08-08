import { Cluster, ClusterManager, Bucket } from 'couchbase';

import { CouchbaseConnectionConfig } from './interfaces';
import { promisify, flattenPromise } from '../utils';

export class CouchbaseConnectionFactory {
  config: CouchbaseConnectionConfig;
  cluster: Cluster;
  manager: ClusterManager;
  buckets: { [key: string]: Bucket } = {};

  constructor(config: CouchbaseConnectionConfig) {
    this.config = config;
  }

  static async create(
    config: CouchbaseConnectionConfig,
  ): Promise<CouchbaseConnectionFactory> {
    const conn = new CouchbaseConnectionFactory(config);
    await conn.createCluster();
    await conn.createManager();

    return conn;
  }

  async getBucket(name: string): Promise<[Error, Bucket]> {
    return this.config.mock
      ? [undefined, this.cluster.openBucket()]
      : await this.openBucket(name);
  }

  async createBucket(
    name: string,
    /* istanbul ignore next */ options: any = {},
  ): Promise<[Error, boolean]> {
    return flattenPromise(promisify(this.manager.createBucket, this.manager))(
      name,
      options,
    );
  }

  async listBuckets(): Promise<any> {
    return flattenPromise(promisify(this.manager.listBuckets, this.manager))();
  }

  async removeBucket(name: string): Promise<[Error, boolean]> {
    return flattenPromise(promisify(this.manager.removeBucket, this.manager))(name);
  }

  private async createCluster(): Promise<void> {
    if (this.config.mock) {
      const mock = require('couchbase').Mock;
      this.cluster = new mock.Cluster();
    } /* istanbul ignore next */ else if (!this.cluster) {
      this.cluster = new Cluster(this.config.url, this.config.options);
      this.cluster.authenticate(this.config.username, this.config.password);
    }
  }

  private async createManager(): Promise<void> {
    /* istanbul ignore next */
    if (!this.manager) {
      this.manager = this.cluster.manager();
    }
  }

  private async openBucket(name: string): Promise<[Error, Bucket]> {
    /* istanbul ignore if */
    if (this.buckets[name]) {
      return [undefined, this.buckets[name]];
    }

    return flattenPromise(
      () =>
        new Promise((resolve, reject) => {
          const bucket = this.cluster.openBucket.bind(this.cluster)(
            name,
            (err: Error) => {
              if (err) {
                reject(err);
              } else {
                this.buckets[name] = bucket;
                resolve(bucket);
              }
            },
          );
        }),
    )();
  }
}
