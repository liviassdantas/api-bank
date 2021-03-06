import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../accounts/accounts.module';
import { AccountDetailsSchema } from '../models/schema/AccountDetailsSchema.schema';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AccountDetails', schema: AccountDetailsSchema },
    ]),
    AccountModule,
    AuthModule,
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}
