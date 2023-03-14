import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  // и чтобы Dto все отработало и свалидировало надо прописать UsePipes
  @UsePipes(new ValidationPipe())
  @HttpCode(200) // чтобы была связь с фронтом  
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  } 

  @UsePipes(new ValidationPipe())
  @HttpCode(200) 
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  } 

  @UsePipes(new ValidationPipe())
  @HttpCode(200) 
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  } 
}
