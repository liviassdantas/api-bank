import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
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

  @UseGuards(JwtAuthGuard)
  @ApiTags('Transfers')
  @ApiUnauthorizedResponse({
    description: `statusCode: 401
                  message: Unauthorized`,
  })
  @ApiOkResponse({
    description: 'The transfer for [email] was succeffully done!',
  })
  @ApiInternalServerErrorResponse({
    description: `
    statusCode: '500',
    message: 'Insufficient funds.',
    error: 'Internal Server Error'`,
  })
  @Post()
  async makeTransfer(@Body() body, @Request() req: any) {
    return this.transferService.realizeTransfer(
      body.target_email,
      body.amount,
      req,
    );
  }
}
