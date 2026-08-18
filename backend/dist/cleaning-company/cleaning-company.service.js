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
exports.CleaningCompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cleaning_company_entity_1 = require("./entities/cleaning-company.entity");
let CleaningCompanyService = class CleaningCompanyService {
    cleaningRepository;
    constructor(cleaningRepository) {
        this.cleaningRepository = cleaningRepository;
    }
    async create(createCleaningDto) {
        const existing = await this.cleaningRepository.findOne({
            where: { email: createCleaningDto.email }
        });
        if (existing) {
            throw new common_1.ConflictException('Компания с таким email уже существует');
        }
        const company = this.cleaningRepository.create(createCleaningDto);
        return await this.cleaningRepository.save(company);
    }
    async findAll() {
        return await this.cleaningRepository.find();
    }
    async findOne(id) {
        const company = await this.cleaningRepository.findOne({ where: { id } });
        if (!company) {
            throw new common_1.NotFoundException(`Компания с ID #${id} не найден`);
        }
        return company;
    }
    async update(id, updateCleaningDto) {
        const company = await this.findOne(id);
        Object.assign(company, updateCleaningDto);
        return await this.cleaningRepository.save(company);
    }
    async remove(id) {
        const company = await this.findOne(id);
        await this.cleaningRepository.remove(company);
    }
};
exports.CleaningCompanyService = CleaningCompanyService;
exports.CleaningCompanyService = CleaningCompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cleaning_company_entity_1.CleaningCompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CleaningCompanyService);
//# sourceMappingURL=cleaning-company.service.js.map