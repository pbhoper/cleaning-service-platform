import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CleaningCompanyEntity } from './entities/cleaning-company.entity';
import { CreateCleaningCompanyDto } from './dto/create-cleaning-company.dto';

@Injectable()
export class CleaningCompanyService {
  constructor(
    @InjectRepository(CleaningCompanyEntity)
    private readonly companyRepository: Repository<CleaningCompanyEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateCleaningCompanyDto) {
    const existing = await this.companyRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Компания с таким email уже зарегистрирована');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const company = this.companyRepository.create({
      ...dto,
      password: hashedPassword,
      role: 'company',
    });

    const savedCompany = await this.companyRepository.save(company);
    const payload = {
      sub: savedCompany.id,
      email: savedCompany.email,
      role: savedCompany.role,
    };

    const token = this.jwtService.sign(payload);
    const { password, ...companyData } = savedCompany;

    return {
      token,
      access_token: token,
      user_role: savedCompany.role,
      company: companyData,
    };
  }

  async findAll(): Promise<CleaningCompanyEntity[]> {
    return await this.companyRepository.find();
  }

  async findByEmail(email: string): Promise<CleaningCompanyEntity | null> {
    return this.companyRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<CleaningCompanyEntity> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Компания не найдена');
    }

    return company;
  }

  async update(id: number, dto: Partial<CreateCleaningCompanyDto>): Promise<CleaningCompanyEntity> {
    const company = await this.findById(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    this.companyRepository.merge(company, dto);
    return await this.companyRepository.save(company);
  }
}
