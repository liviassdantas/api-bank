import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private transferService: TransfersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:user/:starDate/:endDate')
  async requestBankStatement(user: string, startDate: Date, endDate: Date) {
    return this.transferService.getBankStatement(user, startDate, endDate);
  }
}
