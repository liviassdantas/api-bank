import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from '../accounts/accounts.module';
import { AuthModule } from '../auth/auth.module';
import { AccountDetailsSchema } from '../models/schema/AccountDetailsSchema.schema';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AccountDetails', schema: AccountDetailsSchema },
    ]),
    AuthModule,
    AccountModule,
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}
