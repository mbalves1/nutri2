import { Document } from 'mongoose';

export class UserEntity extends Document {
  name: string;
  email: string;
  password: string;
}
