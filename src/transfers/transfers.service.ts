import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../accounts/accounts.service';
import { AccountDetails } from '../transfers/entities/AccountDetails.entities';
import { AccountDetailsDto } from './dto/account-details.dto';

@Injectable()
export class TransfersService {
  private userEmail: string;
  constructor(
    @InjectModel('AccountDetails')
    private readonly accountDetailsModel: Model<AccountDetails>,
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  private async getLoggedUserEmail(req) {
    this.userEmail = await this.authService.getEmailByToken(
      req.headers.authorization,
    );
    return this.userEmail;
  }

  async getBankStatement(req): Promise<Array<AccountDetails>> {
    await this.getLoggedUserEmail(req);
    const totalStatement = await this.accountDetailsModel.find({
      origin_email: this.userEmail,
    });
    return totalStatement;
  }

  async realizeTransfer(target_email, amount, req) {
    await this.getLoggedUserEmail(req);
    const newTransfer = await this.accountService.updateAmount(
      this.userEmail,
      target_email,
      amount,
    );

    if (newTransfer.status == 'ok') {
      const historic = new AccountDetailsDto();
      historic.amount = amount;
      historic.origin_email = this.userEmail;
      historic.target_email = target_email;
      historic.created_at = new Date().toISOString();

      return {
        message: `The transfer for ${target_email} was succeffully done!`,
      };
    } else {
      throw new InternalServerErrorException(newTransfer.message);
    }
  }
}
