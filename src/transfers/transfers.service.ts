import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../accounts/accounts.service';
import { AccountDetails } from '../transfers/entities/AccountDetails.entities';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel('AccountDetails')
    private readonly accountDetailsModel: Model<AccountDetails>,
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  async getBankStatement(req): Promise<Array<AccountDetails>> {
    const userEmail = await this.authService.getEmailByToken(
      req.headers.authorization,
    );
    const totalStatement = await this.accountDetailsModel.find({
      origin_email: userEmail,
    });
    return totalStatement;
  }
}
