"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleaningCompanyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const cleaning_company_service_1 = require("./cleaning-company.service");
const cleaning_company_controller_1 = require("./cleaning-company.controller");
const cleaning_company_entity_1 = require("./entities/cleaning-company.entity");
let CleaningCompanyModule = class CleaningCompanyModule {
};
exports.CleaningCompanyModule = CleaningCompanyModule;
exports.CleaningCompanyModule = CleaningCompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cleaning_company_entity_1.CleaningCompanyEntity]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secretKey',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [cleaning_company_controller_1.CleaningCompanyController],
        providers: [cleaning_company_service_1.CleaningCompanyService],
        exports: [cleaning_company_service_1.CleaningCompanyService],
    })
], CleaningCompanyModule);
//# sourceMappingURL=cleaning-company.module.js.map