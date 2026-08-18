import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: RegisterAuthDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    confirm(token: string): Promise<{
        message: string;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        access_token: string;
    }>;
}
