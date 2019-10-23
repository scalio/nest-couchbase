import { CouchbaseConnectionConfig } from '../../src/couchbase';

export const config: CouchbaseConnectionConfig = {
  url: 'couchbase://127.0.0.1',
  username: 'couchbase',
  password: 'couchbase',
  defaultBucket: {
    name: 'e2e_test',
  },
  buckets: [
    {
      name: 'e2e_test_secure',
      password: 'password',
    },
  ],
};

export const bucketOptions = { bucketType: 'ephemeral', replicaNumber: 0 };
