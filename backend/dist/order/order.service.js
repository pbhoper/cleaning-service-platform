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
const cleaning_calculator_1 = require("../utils/cleaning-calculator");
let OrderService = class OrderService {
    orders = [
        {
            id: 1,
            clientName: 'Анна',
            serviceType: 'Генеральная уборка',
            address: 'ул. Ленина, 10',
            smallRooms: 2,
            largeRooms: 1,
            bathrooms: 1,
            price: 6450,
            estimatedTimeMinutes: 248,
            status: 'open',
            createdAt: new Date(),
        },
        {
            id: 2,
            clientName: 'Иван',
            serviceType: 'Стандартная уборка помещений',
            address: 'пр. Мира, 5',
            smallRooms: 1,
            largeRooms: 0,
            bathrooms: 1,
            price: 2300,
            estimatedTimeMinutes: 90,
            status: 'open',
            createdAt: new Date(),
        },
    ];
    async getOpenOrders() {
        return this.orders.filter(order => order.status === 'open');
    }
    async createOrder(dto) {
        const rooms = {
            smallRooms: dto.smallRooms,
            largeRooms: dto.largeRooms,
            bathrooms: dto.bathrooms,
        };
        const estimate = (0, cleaning_calculator_1.calculateCleaning)(rooms, dto.serviceType);
        const newOrder = {
            id: this.orders.length + 1,
            clientName: dto.clientName,
            serviceType: dto.serviceType,
            address: dto.address,
            smallRooms: dto.smallRooms,
            largeRooms: dto.largeRooms,
            bathrooms: dto.bathrooms,
            price: estimate.totalPrice,
            estimatedTimeMinutes: estimate.totalTimeMinutes,
            status: 'open',
            createdAt: new Date(),
        };
        this.orders.push(newOrder);
        return newOrder;
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