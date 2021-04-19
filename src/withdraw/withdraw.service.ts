import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccountService } from '../accounts/accounts.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WithdrawService {
  private userEmail: string;
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}
  async requestWithdraw(req, amount) {
    this.userEmail = await this.authService.getLoggedUserEmail(req);

    const newWithdraw = await this.accountService.disccountWithdraw(
      this.userEmail,
      amount,
    );

    if (newWithdraw.status == 'ok') {
      return {
        message: `The value ${amount} is already available.`,
      };
    } else {
      throw new InternalServerErrorException(newWithdraw.message);
    }
  }
}
