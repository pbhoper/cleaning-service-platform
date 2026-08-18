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
const update_cleaning_company_dto_1 = require("./dto/update-cleaning-company.dto");
let CleaningCompanyController = class CleaningCompanyController {
    cleaningCompanyService;
    constructor(cleaningCompanyService) {
        this.cleaningCompanyService = cleaningCompanyService;
    }
    create(createCleaningCompanyDto) {
        return this.cleaningCompanyService.create(createCleaningCompanyDto);
    }
    findAll() {
        return this.cleaningCompanyService.findAll();
    }
    findOne(id) {
        return this.cleaningCompanyService.findOne(id);
    }
    update(id, updateCleaningCompanyDto) {
        return this.cleaningCompanyService.update(id, updateCleaningCompanyDto);
    }
    remove(id) {
        return this.cleaningCompanyService.remove(id);
    }
};
exports.CleaningCompanyController = CleaningCompanyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cleaning_company_dto_1.CreateCleaningCompanyDto]),
    __metadata("design:returntype", void 0)
], CleaningCompanyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CleaningCompanyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CleaningCompanyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cleaning_company_dto_1.UpdateCleaningCompanyDto]),
    __metadata("design:returntype", void 0)
], CleaningCompanyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CleaningCompanyController.prototype, "remove", null);
exports.CleaningCompanyController = CleaningCompanyController = __decorate([
    (0, common_1.Controller)('cleaning-company'),
    __metadata("design:paramtypes", [cleaning_company_service_1.CleaningCompanyService])
], CleaningCompanyController);
//# sourceMappingURL=cleaning-company.controller.js.map