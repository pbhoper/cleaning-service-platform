import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { calculateCleaning, RoomCounts } from '../utils/cleaning-calculator';
import { Order } from './entity/order.entity';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const rooms: RoomCounts = {
      smallRooms: dto.smallRooms,
      largeRooms: dto.largeRooms,
      bathrooms: dto.bathrooms,
    };

    const estimate = calculateCleaning(rooms, dto.serviceType);

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

  async getCompanyOrders(companyId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { companyId },
      order: { createdAt: 'DESC' },
    });
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async confirmOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Заказ не найден');
    order.status = 'confirmed';
    return await this.orderRepository.save(order);
  }

  async cancelOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Заказ не найден');
    order.status = 'cancelled';
    return await this.orderRepository.save(order);
  }
}
