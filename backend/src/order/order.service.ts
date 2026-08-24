import { Injectable, NotFoundException } from '@nestjs/common';
import {calculateCleaning, RoomCounts} from "../utils/cleaning-calculator";

export interface OrderItem {
  id: number;
  clientName: string;
  serviceType: string;
  address: string;
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
  price: number;
  estimatedTimeMinutes: number;
  status: 'open' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface CreateOrderDto {
  clientName: string;
  serviceType: string;
  address: string;
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
}

@Injectable()
export class OrderService {
  private readonly orders: OrderItem[] = [
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

  async getOpenOrders(): Promise<OrderItem[]> {
    return this.orders.filter(order => order.status === 'open');
  }

  async createOrder(dto: CreateOrderDto): Promise<OrderItem> {
    const rooms: RoomCounts = {
      smallRooms: dto.smallRooms,
      largeRooms: dto.largeRooms,
      bathrooms: dto.bathrooms,
    };

    const estimate = calculateCleaning(rooms, dto.serviceType);

    const newOrder: OrderItem = {
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

  async confirmOrder(orderId: number): Promise<OrderItem> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new NotFoundException(`Заказ с ID ${orderId} не найден`);
    }
    order.status = 'confirmed';
    return order;
  }

  async cancelOrder(orderId: number): Promise<OrderItem> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new NotFoundException(`Заказ с ID ${orderId} не найден`);
    }
    order.status = 'cancelled';
    return order;
  }
}