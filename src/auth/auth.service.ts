import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../accounts/accounts.service';
import { ValidateSecurity } from '../utils/security.util';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
  ) {}

  async signin(accountUser: any) {
    const payload = { email: accountUser.email, sub: accountUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getIdByToken(token: string) {
    const authorization = token.split(' ')[1].toString();
    const verifiedToken = this.jwtService.verify(authorization, {
      secret: jwtConstants.secret,
    });
    console.log('auth', authorization);
    console.log('token id', verifiedToken);
    return verifiedToken.iat;
  }

  async validateAccount(accountEmail: string, accountPassword: string) {
    const accountFound = await this.accountService.findByEmail(accountEmail);
    const passwordChecked = await ValidateSecurity.comparePassword(
      accountPassword,
      accountFound.password,
    );

    if (passwordChecked) {
      const { _id, name, email } = accountFound;
      return { id: _id, name, email };
    }

    return null;
  }
}
