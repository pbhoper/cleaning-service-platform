import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService, AuthTokensResponse, SocialProfile } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

interface RequestWithUser extends Request {
  user?: SocialProfile;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: RegisterAuthDto): Promise<{ message: string }> {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto): Promise<AuthTokensResponse> {
    return this.authService.login(loginDto);
  }

  @Get('confirm')
  async confirm(@Query('token') token: string): Promise<{ message: string }> {
    return this.authService.confirmEmail(token);
  }

  @Get('google')
  async googleAuth(): Promise<void> {}

  @Get('google/callback')
  async googleAuthRedirect(@Req() req: RequestWithUser): Promise<AuthTokensResponse> {
    if (!req.user) {
      throw new Error('Данные пользователя не получены');
    }

    return this.authService.socialLogin(req.user);
  }
}
