import { Entity } from '../../src/couchbase';
import { config } from './config';

@Entity(config.bucket)
export class Cat {
  name: string;
}
