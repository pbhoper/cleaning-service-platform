import { OrderService, OrderItem } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOpenOrders(): Promise<OrderItem[]>;
    confirmOrder(id: number): Promise<OrderItem>;
    cancelOrder(id: number): Promise<OrderItem>;
}
