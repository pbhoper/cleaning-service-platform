import { Injectable, NotFoundException } from '@nestjs/common';

export interface OrderItem {
  id: number;
  clientName: string;
  serviceType: string;
  address: string;
  status: 'open' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

@Injectable()
export class OrderService {

  private readonly orders: OrderItem[] = [
    { id: 1, clientName: 'Анна', serviceType: 'Генеральная уборка', address: 'ул. Ленина, 10', status: 'open', createdAt: new Date() },
    { id: 2, clientName: 'Иван', serviceType: 'Поддерживающая уборка', address: 'пр. Мира, 5', status: 'open', createdAt: new Date() },
  ];

  async getOpenOrders(): Promise<OrderItem[]> {
    return this.orders.filter(order => order.status === 'open');
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