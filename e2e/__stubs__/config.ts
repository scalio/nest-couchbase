import { CouchbaseConnectionConfig } from '../../src/couchbase';

export const config: CouchbaseConnectionConfig = {
  url: 'couchbase://127.0.0.1',
  username: 'couchbase',
  password: 'couchbase',
  bucket: 'e2e_test',
};

export const bucketOptions = { bucketType: 'ephemeral', replicaNumber: 0 };
