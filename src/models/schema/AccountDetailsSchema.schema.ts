import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDetailsDocument = AccountDetails & Document;

@Schema()
export class AccountDetails {
  id: string;

  @Prop()
  origin_email: string;

  @Prop()
  target_email: string;

  @Prop()
  amount: number;

  @Prop()
  created_at: Date;
}

export const AccountDetailsSchema = SchemaFactory.createForClass(
  AccountDetails,
);
