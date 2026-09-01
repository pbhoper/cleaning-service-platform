"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryCleanService = void 0;
const common_1 = require("@nestjs/common");
let HistoryCleanService = class HistoryCleanService {
    cleaningHistory = [
        {
            id: 1,
            userId: 1,
            companyId: 1,
            companyName: 'Чистый Дом',
            serviceType: 'Генеральная уборка',
            address: 'ул. Ленина, д. 45, кв. 12',
            smallRooms: 2,
            largeRooms: 1,
            bathrooms: 1,
            price: 5000,
            estimatedTimeMinutes: 240,
            status: 'confirmed',
            createdAt: '2026-02-01T10:00:00.000Z',
        },
        {
            id: 2,
            userId: 1,
            companyId: 2,
            companyName: 'ЭкоКлининг',
            serviceType: 'Поддерживающая уборка',
            address: 'пр. Мира, д. 10, кв. 88',
            smallRooms: 1,
            largeRooms: 1,
            bathrooms: 1,
            price: 2500,
            estimatedTimeMinutes: 120,
            status: 'open',
            createdAt: '2026-02-15T14:30:00.000Z',
        },
    ];
    async getHistoryByUserId(userId) {
        const userOrders = this.cleaningHistory.filter((order) => order.userId === Number(userId));
        return {
            success: true,
            data: userOrders,
        };
    }
};
exports.HistoryCleanService = HistoryCleanService;
exports.HistoryCleanService = HistoryCleanService = __decorate([
    (0, common_1.Injectable)()
], HistoryCleanService);
//# sourceMappingURL=history-clean.service.js.map