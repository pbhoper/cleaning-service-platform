import { Repository } from 'typeorm';
import { CleaningCompanyEntity } from "./entities/cleaning-company.entity";
import { CreateCleaningCompanyDto } from "./dto/create-cleaning-company.dto";
import { UpdateCleaningCompanyDto } from "./dto/update-cleaning-company.dto";
export declare class CleaningCompanyService {
    private readonly cleaningRepository;
    constructor(cleaningRepository: Repository<CleaningCompanyEntity>);
    create(createCleaningDto: CreateCleaningCompanyDto): Promise<CleaningCompanyEntity>;
    findAll(): Promise<CleaningCompanyEntity[]>;
    findOne(id: number): Promise<CleaningCompanyEntity>;
    update(id: number, updateCleaningDto: UpdateCleaningCompanyDto): Promise<CleaningCompanyEntity>;
    remove(id: number): Promise<void>;
}
