export * from './module';
export * from './couchbase';

// import {
//   CouchbaseConnectionFactory,
//   CouchbaseConnectionConfig,
//   CouchbaseRepositoryFactory,
//   Entity,
// } from './couchbase';
// import {} from './module';

// @Entity('test')
// class TestEntity {}

// async function test() {
//   const config: CouchbaseConnectionConfig = {
//     url: 'couchbase://127.0.0.1',
//     username: 'couchbase',
//     password: 'couchbase',
//     bucket: 'test',
//   };

//   const cluster = await CouchbaseConnectionFactory.createCluster(config);
//   const repositoryFactory = CouchbaseRepositoryFactory.create(cluster, config);
//   const repository = await repositoryFactory.create<TestEntity>(TestEntity);

//   try {
//     const res = await repository.get('test');
//   } catch (error) {
//     console.log(error);
//   }
// }

// test();
