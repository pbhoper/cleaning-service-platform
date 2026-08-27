"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleaningCompanyController = void 0;
const common_1 = require("@nestjs/common");
const cleaning_company_service_1 = require("./cleaning-company.service");
const create_cleaning_company_dto_1 = require("./dto/create-cleaning-company.dto");
let CleaningCompanyController = class CleaningCompanyController {
    companyService;
    constructor(companyService) {
        this.companyService = companyService;
    }
    async register(dto) {
        return this.companyService.create(dto);
    }
    async getProfile(id) {
        return this.companyService.findById(id);
    }
};
exports.CleaningCompanyController = CleaningCompanyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cleaning_company_dto_1.CreateCleaningCompanyDto]),
    __metadata("design:returntype", Promise)
], CleaningCompanyController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CleaningCompanyController.prototype, "getProfile", null);
exports.CleaningCompanyController = CleaningCompanyController = __decorate([
    (0, common_1.Controller)('cleaning-company'),
    __metadata("design:paramtypes", [cleaning_company_service_1.CleaningCompanyService])
], CleaningCompanyController);
//# sourceMappingURL=cleaning-company.controller.js.map