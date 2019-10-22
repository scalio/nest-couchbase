import { ClusterConstructorOptions } from 'couchbase';

export interface CouchbaseConnectionConfig {
  url: string;
  username?: string;
  password?: string;
  defaultBucket: CouchbaseBucketConfig;
  buckets?: CouchbaseBucketConfig[];
  sync?: boolean;
  options?: ClusterConstructorOptions;
  mock?: boolean;
}

export interface CouchbaseBucketConfig {
  name: string;
  password?: string;
}
