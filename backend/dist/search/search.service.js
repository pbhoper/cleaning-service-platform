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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const search_entity_1 = require("./entities/search.entity");
let SearchService = class SearchService {
    searchRepository;
    constructor(searchRepository) {
        this.searchRepository = searchRepository;
    }
    async findCompanies(query) {
        const { location, cleaningType, schedule, date, minPrice, maxPrice, sortBy, sortOrder = 'ASC', page = 1, limit = 10, } = query;
        const queryBuilder = this.searchRepository.createQueryBuilder('company');
        if (location) {
            queryBuilder.andWhere('company.location ILIKE :location', { location: '%' + location + '%' });
        }
        if (cleaningType) {
            queryBuilder.andWhere('company.cleaningType = :cleaningType', { cleaningType });
        }
        if (schedule) {
            queryBuilder.andWhere('company.schedule = :schedule', { schedule });
        }
        if (date) {
            queryBuilder.andWhere('company.availableDate = :date::date', { date });
        }
        if (minPrice !== undefined) {
            queryBuilder.andWhere('company.price >= :minPrice', { minPrice });
        }
        if (maxPrice !== undefined) {
            queryBuilder.andWhere('company.price <= :maxPrice', { maxPrice });
        }
        if (sortBy) {
            const allowedSortFields = ['price', 'rating', 'availableDate'];
            if (allowedSortFields.includes(sortBy)) {
                queryBuilder.orderBy('company.' + sortBy, sortOrder);
            }
            else {
                throw new common_1.BadRequestException('Сортировка по данному полю не поддерживается');
            }
        }
        else {
            queryBuilder.orderBy('company.id', 'DESC');
        }
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return {
            data,
            meta: {
                total,
                page,
                limit,
                lastPage: Math.ceil(total / limit),
            },
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(search_entity_1.SearchEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map