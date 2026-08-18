import { CleaningCompanyService } from './cleaning-company.service';
import { CreateCleaningCompanyDto } from './dto/create-cleaning-company.dto';
import { UpdateCleaningCompanyDto } from './dto/update-cleaning-company.dto';
export declare class CleaningCompanyController {
    private readonly cleaningCompanyService;
    constructor(cleaningCompanyService: CleaningCompanyService);
    create(createCleaningCompanyDto: CreateCleaningCompanyDto): Promise<import("./entities/cleaning-company.entity").CleaningCompanyEntity>;
    findAll(): Promise<import("./entities/cleaning-company.entity").CleaningCompanyEntity[]>;
    findOne(id: number): Promise<import("./entities/cleaning-company.entity").CleaningCompanyEntity>;
    update(id: number, updateCleaningCompanyDto: UpdateCleaningCompanyDto): Promise<import("./entities/cleaning-company.entity").CleaningCompanyEntity>;
    remove(id: number): Promise<void>;
}
