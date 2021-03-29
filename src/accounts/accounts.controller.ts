import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { CreateAccountsDto } from './dto/create-accounts.dto';

@Controller('accounts')
export class AccountController {
  constructor(
    private accountService: AccountService) {}
  
  @Post()
  async createAccount (@Body() createAccountsDto: CreateAccountsDto) {
    return this.accountService.create(createAccountsDto)
  }
}
