import { Repository } from 'typeorm';
import { Order } from "./entity/order.entity";
import { CreateOrderDto } from "./dto/order.dto";
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    createOrder(dto: CreateOrderDto): Promise<Order>;
    getCompanyOrders(companyId: number): Promise<Order[]>;
    getUserOrders(userId: number): Promise<Order[]>;
    confirmOrder(orderId: number): Promise<Order>;
    cancelOrder(orderId: number): Promise<Order>;
}
