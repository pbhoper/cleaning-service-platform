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
export declare class OrderService {
    private readonly orders;
    getOpenOrders(): Promise<OrderItem[]>;
    createOrder(dto: CreateOrderDto): Promise<OrderItem>;
    confirmOrder(orderId: number): Promise<OrderItem>;
    cancelOrder(orderId: number): Promise<OrderItem>;
}
