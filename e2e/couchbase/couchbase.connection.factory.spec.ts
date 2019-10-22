import { CouchbaseConnectionFactory } from '../../src/couchbase/couchbase.connection.factory';
import { sleep } from '../../src/utils';
import { config, bucketOptions } from '../__stubs__';

describe('#couchbase', () => {
  describe('#CouchbaseConnectionFactory', () => {
    it('should be defined', () => {
      expect(CouchbaseConnectionFactory).toBeDefined();
    });

    describe('#create', () => {
      it('should be defined', () => {
        expect(CouchbaseConnectionFactory.create).toBeDefined();
      });
      it('should create an instance', async () => {
        const conn = await CouchbaseConnectionFactory.create(config);
        expect(conn).toBeInstanceOf(CouchbaseConnectionFactory);
      });
      it('should create an instance with mock', async () => {
        const conn = await CouchbaseConnectionFactory.create({ ...config, mock: true });
        expect(conn).toBeInstanceOf(CouchbaseConnectionFactory);
      });
    });

    describe('#methods', () => {
      let conn: CouchbaseConnectionFactory;
      let mocked: CouchbaseConnectionFactory;

      async function removeBuckets() {
        const [_, buckets] = await conn.listBuckets();
        if (buckets && buckets.length) {
          for (let i = 0; i < buckets.length; i++) {
            await conn.removeBucket(buckets[0].name);
          }
        }
      }

      beforeAll(async () => {
        conn = await CouchbaseConnectionFactory.create(config);
        mocked = await CouchbaseConnectionFactory.create({ ...config, mock: true });
        await removeBuckets();
      });

      afterAll(async () => {
        await removeBuckets();
      });

      describe('#createBucket', () => {
        it('should create a bucket', async () => {
          const [err, ok] = await conn.createBucket(
            config.defaultBucket.name,
            bucketOptions,
          );
          expect(err).toBeUndefined();
          expect(ok).toBe(true);
          await sleep(3500);
        });
        it('should return an error', async () => {
          const [err, _] = await conn.createBucket(
            config.defaultBucket.name,
            bucketOptions,
          );
          expect(err).toBeInstanceOf(Error);
        });
      });

      describe('#listBuckets', () => {
        it('should return an array of buckets', async () => {
          const [_, buckets] = await conn.listBuckets();
          expect(Array.isArray(buckets)).toBe(true);
        });
      });

      describe('#getBucket', () => {
        it('should return an error', async () => {
          const [err, _] = await conn.getBucket('invalid');
          expect(err).toBeInstanceOf(Error);
        });
        it('should return a bucket', async () => {
          const [_, bucket] = await conn.getBucket(config.defaultBucket.name);
          expect(bucket).toBeDefined();
          bucket.disconnect();
        });
        it('should return a bucket with mock', async () => {
          const [_, bucket] = await mocked.getBucket(config.defaultBucket.name);
          expect(bucket).toBeDefined();
        });
      });

      describe('#removeBucket', () => {
        it('should return an error', async () => {
          const [err, _] = await conn.removeBucket('invalid');
          expect(err).toBeInstanceOf(Error);
        });
        it('should remove a bucket', async () => {
          const [_, ok] = await conn.removeBucket(config.defaultBucket.name);
          expect(ok).toBe(true);
        });
      });
    });
  });
});
