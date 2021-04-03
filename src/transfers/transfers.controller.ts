import { Controller, Get } from '@nestjs/common';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private transferService: TransfersService) {}

//   @Get()
//   async requestBankStatement(){
//       return 
//   }
}
