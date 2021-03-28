import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';


@Controller()
export class AuthController {
constructor(
    private authService: AuthService
){}

  @UseGuards(LocalAuthGuard)
  @ApiTags('auth')
  @Post('auth/login')
  @ApiOkResponse({description: "access-token: a bearer token"})
  @ApiUnauthorizedResponse({description: "You have no permission to this action."})
  async login(@Request() req: any){
    return this.authService.login(req.user);
  }
}