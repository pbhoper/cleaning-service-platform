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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleaningCompanyEntity = void 0;
const typeorm_1 = require("typeorm");
let CleaningCompanyEntity = class CleaningCompanyEntity {
    id;
    name;
    email;
    password;
    phone;
    address;
    latitude;
    longitude;
    description;
    logo;
    serviceTypes;
    pricePerSqM;
    basePrices;
    coefficients;
    role;
    rating;
    createdAt;
    updatedAt;
};
exports.CleaningCompanyEntity = CleaningCompanyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision', { nullable: true }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision', { nullable: true }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], CleaningCompanyEntity.prototype, "serviceTypes", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 50 }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "pricePerSqM", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], CleaningCompanyEntity.prototype, "basePrices", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], CleaningCompanyEntity.prototype, "coefficients", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'company' }),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 3, scale: 2, default: 5.0 }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CleaningCompanyEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CleaningCompanyEntity.prototype, "updatedAt", void 0);
exports.CleaningCompanyEntity = CleaningCompanyEntity = __decorate([
    (0, typeorm_1.Entity)('cleaning_companies')
], CleaningCompanyEntity);
//# sourceMappingURL=cleaning-company.entity.js.map