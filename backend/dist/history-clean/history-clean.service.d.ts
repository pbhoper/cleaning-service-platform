export declare class HistoryCleanService {
    private readonly cleaningHistory;
    getHistoryByUserId(userId: string): Promise<{
        success: boolean;
        data: {
            id: number;
            date: string;
            serviceType: string;
            status: string;
            price: number;
        }[];
    }>;
}
