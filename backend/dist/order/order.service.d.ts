export interface OrderItem {
    id: number;
    clientName: string;
    serviceType: string;
    address: string;
    status: 'open' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: Date;
}
export declare class OrderService {
    private readonly orders;
    getOpenOrders(): Promise<OrderItem[]>;
    confirmOrder(orderId: number): Promise<OrderItem>;
    cancelOrder(orderId: number): Promise<OrderItem>;
}
