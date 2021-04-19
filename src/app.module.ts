import { WithdrawModule } from './withdraw/withdraw.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TransfersModule } from './transfers/transfers.module';
import { AccountModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    WithdrawModule,
    ConfigModule.forRoot(),
    TransfersModule,
    AuthModule,
    AccountModule,
    MongooseModule.forRoot('mongodb://localhost:27017/api-bank'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
