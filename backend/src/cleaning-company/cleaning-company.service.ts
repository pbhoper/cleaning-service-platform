import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CleaningCompanyEntity } from './entities/cleaning-company.entity';
import { CreateCleaningCompanyDto } from './dto/create-cleaning-company.dto';

export interface CreateCompanyResponse {
  token: string;
  accessToken: string;
  userRole: string;
  company: Omit<CleaningCompanyEntity, 'password'>;
}

@Injectable()
export class CleaningCompanyService {
  constructor(
    @InjectRepository(CleaningCompanyEntity)
    private readonly companyRepository: Repository<CleaningCompanyEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateCleaningCompanyDto): Promise<CreateCompanyResponse> {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...companyData } = savedCompany;

    return {
      token,
      accessToken: token,
      userRole: savedCompany.role,
      company: companyData,
    };
  }

  async findAll(): Promise<CleaningCompanyEntity[]> {
    return this.companyRepository.find();
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
    return this.companyRepository.save(company);
  }
}
