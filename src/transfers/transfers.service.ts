import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDetails } from '../transfers/entities/AccountDetails.entities';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel('AccountDetails')
    private readonly accountDetailsModel: Model<AccountDetails>,
  ) {}

  async getBankStatement(user: string, startDate: Date, endDate: Date) {
    const totalStatement = await this.accountDetailsModel.find({
      origin_email: user,
    });
    const bankStatementPeriod = Array<AccountDetails>();
    totalStatement.filter(async (detail) => {
      while (this.getPeriod(startDate, endDate, detail.created_at)) {
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
