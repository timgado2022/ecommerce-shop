import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  // и чтобы Dto все отработало и свалидировало надо прописать UsePipes
  @UsePipes(new ValidationPipe())
  @HttpCode(200) // чтобы была связь с фронтом  
  @Post('register')

  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  } 
}
