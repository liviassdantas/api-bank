import { Document } from 'mongoose';

export class AccountDetails extends Document {
  id: string;
  origin_email: string;
  target_email: string;
  amount: number;
  created_at: Date;
}
