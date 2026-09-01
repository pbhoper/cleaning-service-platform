import { HistoryCleanService } from './history-clean.service';
export declare class HistoryCleanController {
    private readonly historyCleanService;
    constructor(historyCleanService: HistoryCleanService);
    getHistoryByUserId(userId: number): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number;
            companyId: number;
            companyName: string;
            serviceType: string;
            address: string;
            smallRooms: number;
            largeRooms: number;
            bathrooms: number;
            price: number;
            estimatedTimeMinutes: number;
            status: string;
            createdAt: string;
        }[];
    }>;
}
