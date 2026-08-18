import { Repository } from 'typeorm';
import { SearchEntity } from './entities/search.entity';
import { SearchQueryDto } from './dto/create-search.dto';
export declare class SearchService {
    private readonly searchRepository;
    constructor(searchRepository: Repository<SearchEntity>);
    findCompanies(query: SearchQueryDto): Promise<{
        data: SearchEntity[];
        meta: {
            total: number;
            page: number;
            limit: number;
            lastPage: number;
        };
    }>;
}
