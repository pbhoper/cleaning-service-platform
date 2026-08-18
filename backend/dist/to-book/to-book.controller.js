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
exports.ToBookController = void 0;
const common_1 = require("@nestjs/common");
const to_book_service_1 = require("./to-book.service");
const create_to_book_dto_1 = require("./dto/create-to-book.dto");
let ToBookController = class ToBookController {
    toBookService;
    constructor(toBookService) {
        this.toBookService = toBookService;
    }
    async createBooking(dto) {
        const mockClientId = 1;
        return this.toBookService.createBooking(mockClientId, dto);
    }
    async getMyBookings() {
        const mockClientId = 1;
        return this.toBookService.getClientBookings(mockClientId);
    }
};
exports.ToBookController = ToBookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_to_book_dto_1.CreateToBookDto]),
    __metadata("design:returntype", Promise)
], ToBookController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)('my-bookings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToBookController.prototype, "getMyBookings", null);
exports.ToBookController = ToBookController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [to_book_service_1.ToBookService])
], ToBookController);
//# sourceMappingURL=to-book.controller.js.map