import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/create-search.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchCompanies(query: SearchQueryDto): Promise<{
        data: import("./entities/search.entity").SearchEntity[];
        meta: {
            total: number;
            page: number;
            limit: number;
            lastPage: number;
        };
    }>;
}
