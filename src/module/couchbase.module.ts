import { Module, DynamicModule } from '@nestjs/common';

import { CouchbaseConnectionConfig } from '../couchbase';
import { CouchbaseModuleAsyncOptions } from './interfaces';
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

  static forRootAsync(options: CouchbaseModuleAsyncOptions): DynamicModule {
    return {
      module: CouchbaseModule,
      imports: [CouchbaseCoreModule.forRootAsync(options)],
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
