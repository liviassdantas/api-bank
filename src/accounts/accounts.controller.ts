import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccountService } from './accounts.service';
import { CreateAccountsDto } from './dto/create-accounts.dto';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @ApiTags('accounts')
  @ApiUnauthorizedResponse({
    description: `statusCode: 401
                  message: Unauthorized`,
  })
  @ApiOkResponse({
    description: `
                  message: 'The new account has been created!'`,
  })
  @Post()
  async createAccount(@Body() createAccountsDto: CreateAccountsDto) {
    return this.accountService.create(createAccountsDto);
  }
}
