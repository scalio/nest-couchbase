import { Global, Module, DynamicModule } from '@nestjs/common';

import { CouchbaseConnectionConfig } from '../couchbase';
import { createCouchbaseConnectionProviders } from './providers';

@Global()
@Module({})
export class CouchbaseCoreModule {
  static forRoot(config: CouchbaseConnectionConfig): DynamicModule {
    const providers = createCouchbaseConnectionProviders(config);
    return {
      module: CouchbaseCoreModule,
      providers,
      exports: providers,
    };
  }
}
