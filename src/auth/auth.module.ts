import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import {AuthController} from "./auth.controller"
import { JwtStrategy } from "./jwt.strategy";
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { jwtConstants } from "./constants";

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s' }
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers:[
    AuthService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule{}