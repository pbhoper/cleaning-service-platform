"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
let OrderService = class OrderService {
    orders = [
        { id: 1, clientName: 'Анна', serviceType: 'Генеральная уборка', address: 'ул. Ленина, 10', status: 'open', createdAt: new Date() },
        { id: 2, clientName: 'Иван', serviceType: 'Поддерживающая уборка', address: 'пр. Мира, 5', status: 'open', createdAt: new Date() },
    ];
    async getOpenOrders() {
        return this.orders.filter(order => order.status === 'open');
    }
    async confirmOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            throw new common_1.NotFoundException(`Заказ с ID ${orderId} не найден`);
        }
        order.status = 'confirmed';
        return order;
    }
    async cancelOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            throw new common_1.NotFoundException(`Заказ с ID ${orderId} не найден`);
        }
        order.status = 'cancelled';
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
//# sourceMappingURL=order.service.js.map