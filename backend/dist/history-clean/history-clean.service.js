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
        { id: 1, date: '2026-06-01', serviceType: 'Генеральная уборка', status: 'Завершено', price: 5000 },
        { id: 2, date: '2026-06-15', serviceType: 'Поддерживающая уборка', status: 'Завершено', price: 2500 },
    ];
    async getHistoryByUserId(userId) {
        return {
            success: true,
            data: this.cleaningHistory,
        };
    }
};
exports.HistoryCleanService = HistoryCleanService;
exports.HistoryCleanService = HistoryCleanService = __decorate([
    (0, common_1.Injectable)()
], HistoryCleanService);
//# sourceMappingURL=history-clean.service.js.map