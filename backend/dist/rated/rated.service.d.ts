export interface RatingItem {
    id: number;
    clientId: string;
    companyId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
}
export declare class RatedService {
    private readonly ratings;
    createRating(rateData: {
        clientId: string;
        companyId: string;
        rating: number;
        comment?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: RatingItem;
    }>;
    getCompanyRatings(companyId: string): Promise<{
        success: boolean;
        data: RatingItem[];
    }>;
}
