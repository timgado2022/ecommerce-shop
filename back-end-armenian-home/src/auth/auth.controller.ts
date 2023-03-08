import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200) // чтобы была связь с фронтом  
  @Post('register')
  async register() {
    return this.authService.register();
  } 
}
