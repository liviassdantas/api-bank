import { Controller } from '@nestjs/common';
import { AuthService } from './shared/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
