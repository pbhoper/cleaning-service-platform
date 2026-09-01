import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import {CreateOrderDto} from "./dto/order.dto";
import {Order} from "./entity/order.entity";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return await this.orderService.createOrder(dto);
  }

  @Get('company/:companyId')
  async getCompanyOrders(@Param('companyId', ParseIntPipe) companyId: number): Promise<Order[]> {
    return await this.orderService.getCompanyOrders(companyId);
  }

  @Get('user/:userId')
  async getUserOrders(@Param('userId', ParseIntPipe) userId: number): Promise<Order[]> {
    return await this.orderService.getUserOrders(userId);
  }

  @Patch(':id/confirm')
  async confirmOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.orderService.confirmOrder(id);
  }

  @Patch(':id/cancel')
  async cancelOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.orderService.cancelOrder(id);
  }
}