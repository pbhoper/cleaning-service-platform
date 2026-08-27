"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const auth_entity_1 = require("./entities/auth.entity");
const cleaning_company_service_1 = require("../cleaning-company/cleaning-company.service");
let AuthService = class AuthService {
    authRepository;
    jwtService;
    cleaningCompanyService;
    constructor(authRepository, jwtService, cleaningCompanyService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.cleaningCompanyService = cleaningCompanyService;
    }
    async register(dto) {
        const existingUser = await this.authRepository.findOne({ where: { email: dto.email } });
        if (existingUser) {
            throw new common_1.BadRequestException('Пользователь с таким email уже существует');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const confirmationToken = (0, uuid_1.v4)();
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
    async login(dto) {
        const user = await this.authRepository.findOne({ where: { email: dto.email } });
        if (user) {
            if (!user.password) {
                throw new common_1.UnauthorizedException('Неверные учетные данные');
            }
            const isPasswordValid = await bcrypt.compare(dto.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Неверные учетные данные');
            }
            if (!user.isConfirmed) {
                throw new common_1.UnauthorizedException('Пожалуйста, подтвердите email или телефон');
            }
            return this.generateTokens(user.id, user.email, 'user');
        }
        const company = await this.cleaningCompanyService.findByEmail(dto.email);
        if (company && company.password) {
            const isCompanyPasswordValid = await bcrypt.compare(dto.password, company.password);
            if (!isCompanyPasswordValid) {
                throw new common_1.UnauthorizedException('Неверные учетные данные');
            }
            return this.generateTokens(company.id, company.email, 'company');
        }
        throw new common_1.UnauthorizedException('Неверные учетные данные');
    }
    async confirmEmail(token) {
        const user = await this.authRepository.findOne({ where: { confirmationToken: token } });
        if (!user) {
            throw new common_1.BadRequestException('Неверный или устаревший токен');
        }
        user.isConfirmed = true;
        user.confirmationToken = null;
        await this.authRepository.save(user);
        return { message: 'Аккаунт успешно подтвержден!' };
    }
    async socialLogin(profile) {
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
    generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        return {
            access_token: this.jwtService.sign(payload),
            user_role: role,
        };
    }
    sendConfirmationEmail(email, token) {
        console.log(`[EMAIL SEND MOCK] Ссылка для ${email}: http://localhost:3000/auth/confirm?token=${token}`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        cleaning_company_service_1.CleaningCompanyService])
], AuthService);
//# sourceMappingURL=auth.service.js.map