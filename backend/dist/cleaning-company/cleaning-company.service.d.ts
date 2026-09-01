import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CleaningCompanyEntity } from "./entities/cleaning-company.entity";
import { CreateCleaningCompanyDto } from "./dto/create-cleaning-company.dto";
export declare class CleaningCompanyService {
    private readonly companyRepository;
    private readonly jwtService;
    constructor(companyRepository: Repository<CleaningCompanyEntity>, jwtService: JwtService);
    create(dto: CreateCleaningCompanyDto): Promise<{
        token: string;
        access_token: string;
        user_role: string;
        company: {
            id: number;
            name: string;
            email: string;
            phone: string;
            address: string;
            latitude: number;
            longitude: number;
            description: string;
            logo: string;
            serviceTypes: string[];
            pricePerSqM: number;
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
    findByEmail(email: string): Promise<CleaningCompanyEntity | null>;
    findById(id: number): Promise<CleaningCompanyEntity>;
}
