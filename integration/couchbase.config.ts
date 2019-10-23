import { CouchbaseConnectionConfig } from '../src/couchbase';

export const config: CouchbaseConnectionConfig = {
  url: 'couchbase://127.0.0.1',
  username: undefined,
  password: undefined,
  defaultBucket: {
    name: 'test',
    password: '123456',
  },
};
