import { RatedService } from './rated.service';
import { RatingItem } from './rated.service';
export declare class RatedController {
    private readonly ratedService;
    constructor(ratedService: RatedService);
    rateCompany(body: {
        clientId: string;
        companyId: string;
        rating: number;
        comment?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: RatingItem;
    }>;
    getRatings(companyId: string): Promise<{
        success: boolean;
        data: RatingItem[];
    }>;
}
