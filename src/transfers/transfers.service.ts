import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from '../accounts/accounts.service';
import { AccountDetails } from '../transfers/entities/AccountDetails.entities';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel('AccountDetails')
    private readonly accountDetailsModel: Model<AccountDetails>,
    private readonly accountService: AccountService,
  ) {}

  async getBankStatement(req, startDate: string, endDate: string) {
    const startDateParse = new Date(startDate);
    const endDateParse = new Date(endDate);
    const userEmail = this.accountService.getLoggedUser(req);
    const totalStatement = await this.accountDetailsModel.find({
      email: userEmail,
    });
    console.log('email decoded:', totalStatement);
    const bankStatementPeriod = Array<AccountDetails>();
    totalStatement.filter(async (detail) => {
      while (this.getPeriod(startDateParse, endDateParse, detail.created_at)) {
        bankStatementPeriod.push(detail);
      }
    });
    return bankStatementPeriod;
  }

  private getPeriod(startDate: Date, endDate: Date, date: Date) {
    const isBetween =
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime();
    return isBetween;
  }
}
