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
    phone;
    address;
    logo;
    rating;
    pricePerSqM;
    latitude;
    longitude;
    isCorporate;
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
], CleaningCompanyEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CleaningCompanyEntity.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 3, scale: 2, default: 0.0 }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 100.0 }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "pricePerSqM", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], CleaningCompanyEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CleaningCompanyEntity.prototype, "isCorporate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CleaningCompanyEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CleaningCompanyEntity.prototype, "updatedAt", void 0);
exports.CleaningCompanyEntity = CleaningCompanyEntity = __decorate([
    (0, typeorm_1.Entity)('clients')
], CleaningCompanyEntity);
//# sourceMappingURL=cleaning-company.entity.js.map