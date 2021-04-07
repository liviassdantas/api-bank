import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private transferService: TransfersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:starDate/:endDate')
  async requestBankStatement(
    @Request() req: any,
    startDate: string,
    endDate: string,
  ) {
    return this.transferService.getBankStatement(req, startDate, endDate);
  }

  // @Post()
  // async makeTransfer(target_email, amount)
}
