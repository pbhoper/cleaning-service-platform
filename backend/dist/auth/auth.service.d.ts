import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from './entities/auth.entity';
import { CleaningCompanyService } from '../cleaning-company/cleaning-company.service';
export declare class AuthService {
    private authRepository;
    private jwtService;
    private cleaningCompanyService;
    constructor(authRepository: Repository<Auth>, jwtService: JwtService, cleaningCompanyService: CleaningCompanyService);
    register(dto: RegisterAuthDto): Promise<{
        message: string;
    }>;
    login(dto: LoginAuthDto): Promise<{
        access_token: string;
        user_role: "user" | "company";
        user_id: number;
    }>;
    confirmEmail(token: string): Promise<{
        message: string;
    }>;
    socialLogin(profile: any): Promise<{
        access_token: string;
        user_role: "user" | "company";
        user_id: number;
    }>;
    private generateTokens;
    private sendConfirmationEmail;
}
