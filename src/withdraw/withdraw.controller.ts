import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
export class WithdrawController {
  constructor(private withdrawService: WithdrawService) {}

  @ApiTags('Withdraw')
  @UseGuards(JwtAuthGuard)
  @Post()
  async requestWithdraw(@Request() req: any, @Body() body) {
    return this.withdrawService.requestWithdraw(req, body.amount);
  }
}
