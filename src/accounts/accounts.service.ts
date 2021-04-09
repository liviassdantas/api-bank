import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../accounts/entities/Account';
import { CreateAccountsDto } from '../accounts/dto/create-accounts.dto';
import { ValidateSecurity } from '../utils/security.util';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account')
    private readonly accountmodel: Model<Account>,
  ) {}

  async create(createAccountsDto: CreateAccountsDto): Promise<any> {
    const newAccount = new this.accountmodel(createAccountsDto);
    const { password } = newAccount;
    newAccount.password = await ValidateSecurity.generateHash(password, 10);

    const emailExists = await this.checkEmail(newAccount.email);

    if (!emailExists) {
      newAccount.accountBalance = 1000;
      await newAccount.save();
      return {
        status: 200,
        message: 'The new account has been created!',
      };
    } else {
      return {
        status: 403,
        message: 'The account already exists.',
      };
    }
  }

  private async checkEmail(email: string): Promise<boolean> {
    const result = await this.findByEmail(email);
    if (result != null) {
      return true;
    } else {
      return false;
    }
  }

  async findByEmail(email: string): Promise<Account> {
    return await this.accountmodel.findOne({ email });
  }

  async findAllByEmail(email: string): Promise<Account> {
    return await this.accountmodel.find({ email });
  }

  async findByID(id: string) {
    console.log('UserID to Find', id);
    const { email } = await this.accountmodel.findOne({ id });
    return email;
  }
}
