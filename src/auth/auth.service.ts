import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../accounts/accounts.service';
import { ValidateSecurity } from '../utils/security.util';
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
