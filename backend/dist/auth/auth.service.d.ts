import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from "./entities/auth.entity";
export declare class AuthService {
    private authRepository;
    private jwtService;
    constructor(authRepository: Repository<Auth>, jwtService: JwtService);
    register(dto: RegisterAuthDto): Promise<{
        message: string;
    }>;
    login(dto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    confirmEmail(token: string): Promise<{
        message: string;
    }>;
    socialLogin(profile: any): Promise<{
        access_token: string;
    }>;
    private generateTokens;
    private sendConfirmationEmail;
}
