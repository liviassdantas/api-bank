import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private transferService: TransfersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Transfers')
  @ApiUnauthorizedResponse({
    description: `statusCode: 401
                  message: Unauthorized`,
  })
  @ApiOkResponse({ description: 'An array of Accounts Details' })
  @Get()
  async requestBankStatement(@Request() req: any) {
    return this.transferService.getBankStatement(req);
  }

  // @Post()
  // async makeTransfer(target_email, amount);
}
