import { Module } from '@nestjs/common';

import { CouchbaseModule } from '../src/module';
import { UsersModule } from './users';
import { config } from './couchbase.config';

@Module({
  imports: [CouchbaseModule.forRoot(config), UsersModule],
})
export class AppModule {}
