import { ClusterConstructorOptions } from 'couchbase';

export interface CouchbaseConnectionConfig {
  url: string;
  username: string;
  password: string;
  bucket: string;
  sync?: boolean;
  options?: ClusterConstructorOptions;
  mock?: boolean;
}
