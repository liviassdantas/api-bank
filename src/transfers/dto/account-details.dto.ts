import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsDate,
} from 'class-validator';

export class AccountDetailsDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  origin_email: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  target_email: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  created_at: string;
}
