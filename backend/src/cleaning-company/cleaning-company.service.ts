import {
  Injectable,
  NotFoundException,
  ConflictException
 } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CleaningCompanyEntity} from "./entities/cleaning-company.entity";
import {CreateCleaningCompanyDto} from "./dto/create-cleaning-company.dto";
import {UpdateCleaningCompanyDto} from "./dto/update-cleaning-company.dto";

@Injectable()
export class CleaningCompanyService {
  constructor(
    @InjectRepository(CleaningCompanyEntity)
    private readonly cleaningRepository: Repository<CleaningCompanyEntity>
  ) {
  }


  async create(createCleaningDto: CreateCleaningCompanyDto): Promise<CleaningCompanyEntity> {
    const existing = await this.cleaningRepository.findOne({
      where: {email: createCleaningDto.email}
    });
    if (existing) {
      throw new ConflictException('Компания с таким email уже существует');
    }

    const company = this.cleaningRepository.create(createCleaningDto);
    return await this.cleaningRepository.save(company);
  }

  async findAll(): Promise<CleaningCompanyEntity[]> {
    return await this.cleaningRepository.find();
  }

  async findOne(id: number): Promise<CleaningCompanyEntity> {
    const company = await this.cleaningRepository.findOne({where: {id}});
    if (!company) {
      throw new NotFoundException(`Компания с ID #${id} не найден`);
    }
    return company;
  }

  async update(id: number, updateCleaningDto: UpdateCleaningCompanyDto): Promise<CleaningCompanyEntity> {
    const company = await this.findOne(id);
    Object.assign(company, updateCleaningDto);
    return await this.cleaningRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.cleaningRepository.remove(company);
  }
}
