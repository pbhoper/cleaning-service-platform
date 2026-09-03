export declare class Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    isCorporate: boolean;
    notificationsEnabled: boolean;
    notificationHours: number;
    avatar: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'blocked';
    blockReason: string;
}
