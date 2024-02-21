import { Request } from 'express';
import { UserEntity } from '../users/entities/user.entity';

export interface ExpressRequest extends Request {
  user?: UserEntity;
}
