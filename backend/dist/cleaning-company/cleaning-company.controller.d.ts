import { CleaningCompanyService } from './cleaning-company.service';
import { CreateCleaningCompanyDto } from "./dto/create-cleaning-company.dto";
export declare class CleaningCompanyController {
    private readonly companyService;
    constructor(companyService: CleaningCompanyService);
    register(dto: CreateCleaningCompanyDto): Promise<{
        token: string;
        access_token: string;
        user_role: string;
        company: {
            id: number;
            name: string;
            email: string;
            phone: string;
            address: string;
            description: string;
            logo: string;
            serviceTypes: string[];
            basePrices: {
                smallRoom: number;
                largeRoom: number;
                bathroom: number;
            };
            coefficients: Record<string, number>;
            role: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getProfile(id: number): Promise<import("./entities/cleaning-company.entity").CleaningCompanyEntity>;
}
