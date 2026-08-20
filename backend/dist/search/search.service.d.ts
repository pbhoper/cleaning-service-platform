import { Repository } from 'typeorm';
import { CleaningCompanyEntity } from '../cleaning-company/entities/cleaning-company.entity';
import { Booking } from "../booking/entities/booking.entity";
import { SearchQueryDto } from "./dto/create-search.dto";
export declare class SearchService {
    private companyRepository;
    private bookingRepository;
    constructor(companyRepository: Repository<CleaningCompanyEntity>, bookingRepository: Repository<Booking>);
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
