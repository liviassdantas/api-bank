import { TransfersController } from './transfers/transfers.controller';
import { TransfersService } from './transfers/transfers.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/api-bank'),
    AuthModule,
    AccountModule,
  ],
  controllers: [TransfersController, AppController],
  providers: [TransfersService, AppService],
})
export class AppModule {}
