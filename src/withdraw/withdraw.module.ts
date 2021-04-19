import { WithdrawService } from './withdraw.service';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../accounts/accounts.module';
import { TransfersModule } from '../transfers/transfers.module';
import { WithdrawController } from './withdraw.controller';

@Module({
  imports: [AuthModule, AccountModule, TransfersModule],
  controllers: [WithdrawController],
  providers: [WithdrawService],
})
export class WithdrawModule {}
