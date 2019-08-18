import { CouchbaseConnectionConfig } from '../../couchbase/interfaces';

export interface CouchbaseModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<CouchbaseConnectionConfig> | CouchbaseConnectionConfig;
  inject?: any[];
}
