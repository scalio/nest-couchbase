import { Bucket } from 'couchbase';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { CouchbaseModule } from '../../src/module/couchbase.module';
import { getClusterToken } from '../../src/module/utils';

describe('#module', () => {
  describe('#CouchbaseModule', () => {
    let app: INestApplication;

    beforeAll(async () => {
      const fixture = await Test.createTestingModule({
        imports: [CouchbaseModule.forRoot({ mock: true } as any)],
      }).compile();

      app = fixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('should get bucket object', () => {
      const bucket = app.get<Bucket>(getClusterToken());
      console.log(bucket);

      expect(bucket).toBeDefined();
      expect((bucket as any).storage).toBeDefined();
      console.log(bucket);
    });
  });
});
