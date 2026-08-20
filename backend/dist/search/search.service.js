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
const cleaning_company_entity_1 = require("../cleaning-company/entities/cleaning-company.entity");
const booking_entity_1 = require("../booking/entities/booking.entity");
const create_search_dto_1 = require("./dto/create-search.dto");
let SearchService = class SearchService {
    companyRepository;
    bookingRepository;
    constructor(companyRepository, bookingRepository) {
        this.companyRepository = companyRepository;
        this.bookingRepository = bookingRepository;
    }
    async searchCompanies(query) {
        const { lat, lng, areaSqM = 50, sortBy = create_search_dto_1.SortBy.RATING, sortOrder = 'DESC', page = 1, limit = 10, } = query;
        const skip = (page - 1) * limit;
        const qb = this.companyRepository
            .createQueryBuilder('company')
            .leftJoin('bookings', 'booking', 'booking.companyId = company.id')
            .select([
            'company.id AS id',
            'company.name AS name',
            'company.logo AS logo',
            'company.address AS address',
            'company.rating AS rating',
            'company.pricePerSqM AS "pricePerSqM"',
        ])
            .addSelect('COUNT(booking.id)', 'popularity')
            .groupBy('company.id');
        if (lat && lng) {
            qb.addSelect(`(6371 * acos(cos(radians(:lat)) * cos(radians(company.latitude)) * cos(radians(company.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(company.latitude))))`, 'distance').setParameters({ lat, lng });
        }
        if (sortBy === create_search_dto_1.SortBy.POPULARITY) {
            qb.orderBy('popularity', sortOrder);
        }
        else if (sortBy === create_search_dto_1.SortBy.PRICE) {
            qb.orderBy('company.pricePerSqM', sortOrder);
        }
        else if (sortBy === create_search_dto_1.SortBy.DISTANCE && lat && lng) {
            qb.orderBy('distance', sortOrder === 'DESC' ? 'DESC' : 'ASC');
        }
        else {
            qb.orderBy('company.rating', sortOrder);
        }
        qb.offset(skip).limit(limit);
        const rawItems = await qb.getRawMany();
        const total = await this.companyRepository.count();
        const items = rawItems.map((c) => ({
            id: c.id,
            name: c.name,
            logo: c.logo || null,
            address: c.address || '',
            rating: Number(c.rating || 0),
            estimatedPrice: Number(c.pricePerSqM || 0) * areaSqM,
            distanceKm: c.distance ? Number(Number(c.distance).toFixed(1)) : null,
            popularity: Number(c.popularity || 0),
        }));
        return {
            items,
            meta: {
                total,
                page,
                limit,
                hasMore: skip + items.length < total,
            },
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cleaning_company_entity_1.CleaningCompanyEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map