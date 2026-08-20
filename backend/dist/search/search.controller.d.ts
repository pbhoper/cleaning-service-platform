import { SearchService } from './search.service';
import { SearchQueryDto } from "./dto/create-search.dto";
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchCompanies(query: SearchQueryDto): Promise<{
        items: {
            id: any;
            name: any;
            logo: any;
            address: any;
            rating: number;
            estimatedPrice: number;
            distanceKm: number | null;
            popularity: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            hasMore: boolean;
        };
    }>;
}
