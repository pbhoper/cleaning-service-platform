import { Controller, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService, OrderItem } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('open')
  async getOpenOrders(): Promise<OrderItem[]> {
    return await this.orderService.getOpenOrders();
  }

  @Patch(':id/confirm')
  async confirmOrder(@Param('id', ParseIntPipe) id: number): Promise<OrderItem> {
    return await this.orderService.confirmOrder(id);
  }

  @Patch(':id/cancel')
  async cancelOrder(@Param('id', ParseIntPipe) id: number): Promise<OrderItem> {
    return await this.orderService.cancelOrder(id);
  }
}