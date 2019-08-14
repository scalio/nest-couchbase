import { Inject } from '@nestjs/common';

import { getConnectionToken, getRepositoryToken } from './utils';

export const InjectRepository = (entity: Function): ParameterDecorator =>
  Inject(getRepositoryToken(entity));

export const InjectConnection = (): ParameterDecorator => Inject(getConnectionToken());
