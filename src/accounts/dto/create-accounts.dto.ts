import {ApiProperty} from '@nestjs/swagger'
import {IsString, IsInt, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateAccountsDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @ApiProperty()
    accountBalance: string;
}