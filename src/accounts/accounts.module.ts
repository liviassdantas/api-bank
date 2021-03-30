import { Module } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AccountController } from './accounts.controller';
import { AccountSchema } from '../models/schema/AccountSchema.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
