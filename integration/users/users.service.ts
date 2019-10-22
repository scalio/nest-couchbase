import { Injectable } from '@nestjs/common';

import { InjectRepository, Repository } from '../../src';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async get(id: string) {
    return (this.repo as any).getFlat(id);
  }
}
