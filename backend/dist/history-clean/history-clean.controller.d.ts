import { HistoryCleanService } from './history-clean.service';
export declare class HistoryCleanController {
    private readonly historyCleanService;
    constructor(historyCleanService: HistoryCleanService);
    getHistory(userId: string): Promise<{
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
