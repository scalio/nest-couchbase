import { Cluster, Bucket } from 'couchbase';
import { oO } from '@zmotivat0r/o0';

import { logger } from '../common';
import { CouchbaseConnectionConfig } from './interfaces';

export class CouchbaseConnectionFactory {
  static buckets: { [key: string]: Bucket } = {};

  static async createCluster(config: CouchbaseConnectionConfig): Promise<Cluster> {
    if (config.mock) {
      const mock = require('couchbase').Mock;
      return new mock.Cluster();
    }

    const cluster = new Cluster(config.url, config.options);
    cluster.authenticate(config.username, config.password);
    return cluster;
  }

  static async getBucket(cluster: Cluster, config: CouchbaseConnectionConfig) {
    if (config.mock) {
      return cluster.openBucket();
    }

    const [err, bucket] = await oO(
      CouchbaseConnectionFactory.openBucket(cluster, config.bucket),
    );

    if (err) {
      throw err;
    }

    return bucket;
  }

  private static async openBucket(cluster: Cluster, name: string): Promise<Bucket> {
    const bucket = CouchbaseConnectionFactory.buckets[name];

    if (bucket) {
      return bucket;
    }

    return new Promise((resolve, reject) => {
      const bucket = cluster.openBucket.bind(cluster)(name, (err: Error) => {
        if (err) {
          logger.error(err);
          reject(err);
        }

        CouchbaseConnectionFactory.buckets[name] = bucket;
        resolve(bucket);
      });
    });
  }
}
