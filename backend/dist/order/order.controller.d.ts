import { OrderService } from './order.service';
import { CreateOrderDto } from "./dto/order.dto";
import { Order } from "./entity/order.entity";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(dto: CreateOrderDto): Promise<Order>;
    getCompanyOrders(companyId: number): Promise<Order[]>;
    getUserOrders(userId: number): Promise<Order[]>;
    confirmOrder(id: number): Promise<Order>;
    cancelOrder(id: number): Promise<Order>;
}
