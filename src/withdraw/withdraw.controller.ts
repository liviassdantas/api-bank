import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
export class WithdrawController {
  constructor(private withdrawService: WithdrawService) {}

  @ApiTags('Withdraw')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({
    description: `statusCode: 401
                  message: Unauthorized`,
  })
  @ApiOkResponse({
    description: 'The value ${amount} is already available.',
  })
  @ApiInternalServerErrorResponse({
    description: `
    statusCode: '500',
    message: 'Insufficient funds.',
    error: 'Internal Server Error'`,
  })
  @Post()
  async requestWithdraw(@Request() req: any, @Body() body) {
    return this.withdrawService.requestWithdraw(req, body.amount);
  }
}
