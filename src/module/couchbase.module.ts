import { Module, DynamicModule } from '@nestjs/common';

import { CouchbaseConnectionConfig } from '../couchbase';
import { CouchbaseCoreModule } from './couchbase-core.module';
import { createCouchbaseProviders } from './providers';

@Module({})
export class CouchbaseModule {
  static forRoot(config: CouchbaseConnectionConfig): DynamicModule {
    return {
      module: CouchbaseModule,
      imports: [CouchbaseCoreModule.forRoot(config)],
    };
  }

  static forFeature(entities: Function[]): DynamicModule {
    const providers = createCouchbaseProviders(entities);
    return {
      module: CouchbaseModule,
      providers,
      exports: providers,
    };
  }
}
