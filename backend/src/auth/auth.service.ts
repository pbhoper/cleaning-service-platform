import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from './entities/auth.entity';
import { CleaningCompanyService } from '../cleaning-company/cleaning-company.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly cleaningCompanyService: CleaningCompanyService,
  ) {}

  async register(dto: RegisterAuthDto) {
    const existingUser = await this.authRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const confirmationToken = uuid4();

    const user = this.authRepository.create({
      ...dto,
      password: hashedPassword,
      provider: 'local',
      confirmationToken,
    });

    await this.authRepository.save(user);

    this.sendConfirmationEmail(user.email, confirmationToken);

    return { message: 'Регистрация успешна. Проверьте почту для подтверждения.' };
  }

  async login(dto: LoginAuthDto) {
    const user = await this.authRepository.findOne({ where: { email: dto.email } });

    if (user) {
      if (!user.password) {
        throw new UnauthorizedException('Неверные учетные данные');
      }

      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Неверные учетные данные');
      }

      if (!user.isConfirmed) {
        throw new UnauthorizedException('Пожалуйста, подтвердите email или телефон');
      }

      return this.generateTokens(user.id, user.email, 'user');
    }

    const company = await this.cleaningCompanyService.findByEmail(dto.email);

    if (company && company.password) {
      const isCompanyPasswordValid = await bcrypt.compare(dto.password, company.password);
      if (!isCompanyPasswordValid) {
        throw new UnauthorizedException('Неверные учетные данные');
      }

      return this.generateTokens(company.id, company.email, 'company');
    }

    throw new UnauthorizedException('Неверные учетные данные');
  }

  async confirmEmail(token: string) {
    const user = await this.authRepository.findOne({ where: { confirmationToken: token } });
    if (!user) {
      throw new BadRequestException('Неверный или устаревший токен');
    }

    user.isConfirmed = true;
    user.confirmationToken = null;
    await this.authRepository.save(user);

    return { message: 'Аккаунт успешно подтвержден!' };
  }

  async socialLogin(profile: any) {
    let user = await this.authRepository.findOne({ where: { email: profile.email } });

    if (!user) {
      user = this.authRepository.create({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        provider: profile.provider,
        providerId: profile.providerId,
        isConfirmed: true,
      });
      await this.authRepository.save(user);
    }

    return this.generateTokens(user.id, user.email, 'user');
  }

  private generateTokens(userId: number, email: string, role: 'user' | 'company') {
    const payload = { sub: userId, email, role };
    return {
      access_token: this.jwtService.sign(payload),
      user_role: role,
      user_id: userId,
    };
  }

  private sendConfirmationEmail(email: string, token: string) {
    console.log(
      `[EMAIL SEND MOCK] Ссылка для ${email}: http://localhost:3000/auth/confirm?token=${token}`,
    );
  }
}
