import { CouchbaseConnectionFactory } from '../../src/couchbase/couchbase.connection.factory';
import { CouchbaseRepositoryFactory } from '../../src/couchbase/couchbase.repository.factory';
import { CouchbaseException } from '../../src/couchbase/exceptions/couchbase.exception';
import { Entity } from '../../src/couchbase/decorators/entity.decorator';
import { sleep, flattenPromise } from '../../src/utils';
import { config, bucketOptions, Cat } from '../__stubs__';

describe('#couchbase', () => {
  describe('#CouchbaseRepositoryFactory', () => {
    it('should be defined', () => {
      expect(CouchbaseRepositoryFactory).toBeDefined();
    });

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
      await conn.createBucket(config.defaultBucket.name, bucketOptions);
      await sleep(3500);
    });

    afterAll(async () => {
      const [_, bucket] = await conn.getBucket(config.defaultBucket.name);
      bucket.disconnect();
      await removeBuckets();
    });

    describe('#create', () => {
      it('should be defined', () => {
        expect(CouchbaseRepositoryFactory.create).toBeDefined();
      });
      it('should throw an error, 1', async () => {
        const [err] = await flattenPromise(CouchbaseRepositoryFactory.create)();
        expect(err).toBeInstanceOf(Error);
      });
      it('should throw an error, 2', async () => {
        const [err] = await flattenPromise(CouchbaseRepositoryFactory.create)(conn);
        expect(err).toBeInstanceOf(Error);
      });
      it('should throw an error, 4', async () => {
        @Entity('invalid')
        class InvalidTestEntity {}
        const [err] = await flattenPromise(CouchbaseRepositoryFactory.create)(
          conn,
          InvalidTestEntity,
        );
        expect(err).toBeInstanceOf(Error);
      });
      it('should create new Repository, 1', async () => {
        const repo = await CouchbaseRepositoryFactory.create(conn, Cat);
        expect(repo).toBeDefined();
        expect(typeof repo).toBe('object');
        expect(repo.entity).toBeDefined();
      });
      it('should create new Repository, 2', async () => {
        class TestEntity {}
        const repo = await CouchbaseRepositoryFactory.create(conn, TestEntity);
        expect(repo).toBeDefined();
        expect(typeof repo).toBe('object');
        expect(repo.entity).toBeDefined();
      });
      it('should create new Repository with mock', async () => {
        const repo = await CouchbaseRepositoryFactory.create(mocked, Cat);
        expect(repo).toBeDefined();
        expect(typeof repo).toBe('object');
        expect(repo.entity).toBeDefined();
      });
    });
  });
});
