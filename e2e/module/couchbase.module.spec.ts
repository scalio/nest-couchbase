import { Test } from '@nestjs/testing';
import { INestApplication, Injectable, Module, Global } from '@nestjs/common';
import { CouchbaseError } from 'couchbase';

import { CouchbaseConnectionFactory } from '../../src/couchbase/couchbase.connection.factory';
import { CouchbaseModule } from '../../src/module/couchbase.module';
import { sleep, flattenPromise } from '../../src/utils';
import { config, bucketOptions, Cat, CatsService } from '../__stubs__';

describe('#module', () => {
  describe('#CouchbaseModule', () => {
    const msg = 'The key does not exist on the server';
    let app: INestApplication;
    let conn: CouchbaseConnectionFactory;
    let service: CatsService;

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
      await removeBuckets();
      await conn.createBucket(config.defaultBucket.name, bucketOptions);
      await sleep(3500);
    });

    afterAll(async () => {
      const [_, bucket] = await conn.getBucket(config.defaultBucket.name);
      bucket.disconnect();
      await removeBuckets();
    });

    describe('#forRoot && forFeature', () => {
      beforeAll(async () => {
        const fixture = await Test.createTestingModule({
          imports: [CouchbaseModule.forRoot(config), CouchbaseModule.forFeature([Cat])],
          providers: [CatsService],
        }).compile();
        app = fixture.createNestApplication();
        await app.init();
        service = app.get<CatsService>(CatsService);
      });

      afterAll(async () => {
        await app.close();
      });

      it('should throw an error', async () => {
        const [err] = await flattenPromise(service.repo.get)('key');
        expect(err.message).toBe(msg);
      });
    });

    describe('#forRootAsync && forFeature', () => {
      beforeAll(async () => {
        @Injectable()
        class ConfigService {
          constructor() {}
          get() {
            return config;
          }
        }

        @Global()
        @Module({
          providers: [ConfigService],
          exports: [ConfigService],
        })
        class ConfigModule {}

        const fixture = await Test.createTestingModule({
          imports: [
            ConfigModule,
            CouchbaseModule.forRootAsync({
              useFactory: (configService: ConfigService) => configService.get(),
              inject: [ConfigService],
            }),
            CouchbaseModule.forFeature([Cat]),
          ],
          providers: [CatsService],
        }).compile();
        app = fixture.createNestApplication();
        await app.init();
        service = app.get<CatsService>(CatsService);
      });

      afterAll(async () => {
        await app.close();
      });

      it('should throw an error', async () => {
        const [err] = await flattenPromise(service.repo.get)('key');
        expect(err.message).toBe(msg);
      });
    });
  });
});
