import { Injectable } from '@nestjs/common';

import { InjectRepository, Repository } from '../../src';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) public repo: Repository<Cat>) {}
}
