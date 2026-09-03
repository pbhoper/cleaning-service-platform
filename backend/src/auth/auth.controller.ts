import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Get('confirm')
  confirm(@Query('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  @Get('google')
  async googleAuth(@Req() req) {

  }

  @Get('google/callback')
  async googleAuthRedirect(@Req() req) {
    return this.authService.socialLogin(req.user);
  }
}