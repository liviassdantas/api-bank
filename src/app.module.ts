import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './accounts/accounts.module';

@Module({
  imports: [ConfigModule.forRoot(),
            MongooseModule.forRoot('mongodb://localhost:27017/api-bank'),
            AuthModule,
            AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
