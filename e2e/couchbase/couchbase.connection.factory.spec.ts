import { oO } from '@zmotivat0r/o0';
import { Cluster } from 'couchbase';

import { CouchbaseConnectionFactory } from '../../src/couchbase/couchbase.connection.factory';
import { config } from '../../test/__stubs__';

describe('#couchbase', () => {
  describe('#CouchbaseConnectionFactory', () => {
    describe('#createCluster', () => {
      it('should be defined', () => {
        expect(CouchbaseConnectionFactory.createCluster).toBeDefined();
      });
      it('should return cluster object', async () => {
        const [_, cluster] = await oO(CouchbaseConnectionFactory.createCluster(config));
        expect(cluster).toBeDefined();
        expect(cluster).toHaveProperty('auther');
      });
      it('should return mocked cluster object', async () => {
        const [_, cluster] = await oO(
          CouchbaseConnectionFactory.createCluster({ ...config, mock: true }),
        );
        expect(cluster).toBeDefined();
        expect(cluster).toHaveProperty('dsnObj');
      });
    });

    describe('#getBucket', () => {
      let cluster: Cluster;

      beforeAll(async () => {
        cluster = await CouchbaseConnectionFactory.createCluster(config);
      });

      it('should be defined', () => {
        expect(CouchbaseConnectionFactory.getBucket).toBeDefined();
      });
      it('should throw an error', async () => {
        const [err] = await oO(
          CouchbaseConnectionFactory.getBucket(cluster, { ...config, bucket: 'invalid' }),
        );
        expect(err).toBeInstanceOf(Error);
      });
      it('should return bucket object', async () => {
        const [_, bucket] = await oO(
          CouchbaseConnectionFactory.getBucket(cluster, config),
        );
        expect(bucket).toBeDefined();
        expect((bucket as any)._name).toBe('test');
        bucket.disconnect();
      });
      it('should return mocked bucket object', async () => {
        const [_, bucket] = await oO(
          CouchbaseConnectionFactory.getBucket(cluster, { ...config, mock: true }),
        );
        expect(bucket).toBeDefined();
        expect((bucket as any)._name).toBe('default');
      });
    });
  });
});
