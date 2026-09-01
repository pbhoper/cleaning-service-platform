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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cleaning_calculator_1 = require("../utils/cleaning-calculator");
const order_entity_1 = require("./entity/order.entity");
let OrderService = class OrderService {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async createOrder(dto) {
        const rooms = {
            smallRooms: dto.smallRooms,
            largeRooms: dto.largeRooms,
            bathrooms: dto.bathrooms,
        };
        const estimate = (0, cleaning_calculator_1.calculateCleaning)(rooms, dto.serviceType);
        const newOrder = this.orderRepository.create({
            companyId: dto.companyId,
            userId: dto.userId,
            clientName: dto.clientName,
            serviceType: dto.serviceType,
            address: dto.address,
            smallRooms: dto.smallRooms,
            largeRooms: dto.largeRooms,
            bathrooms: dto.bathrooms,
            price: estimate.totalPrice,
            estimatedTimeMinutes: estimate.totalTimeMinutes,
            status: 'open',
        });
        return await this.orderRepository.save(newOrder);
    }
    async getCompanyOrders(companyId) {
        return await this.orderRepository.find({
            where: { companyId },
            order: { createdAt: 'DESC' },
        });
    }
    async getUserOrders(userId) {
        return await this.orderRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async confirmOrder(orderId) {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Заказ не найден');
        order.status = 'confirmed';
        return await this.orderRepository.save(order);
    }
    async cancelOrder(orderId) {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Заказ не найден');
        order.status = 'cancelled';
        return await this.orderRepository.save(order);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map