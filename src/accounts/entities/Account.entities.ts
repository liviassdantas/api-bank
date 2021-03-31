import { Document } from 'mongoose';
export class Account extends Document {
  name: string;
  email: string;
  password: string;
  accountBalance: number;
}
