import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { CleaningCompanyService, CreateCompanyResponse } from './cleaning-company.service';
import { CreateCleaningCompanyDto } from './dto/create-cleaning-company.dto';
import { CleaningCompanyEntity } from './entities/cleaning-company.entity';

@Controller('cleaning-company')
export class CleaningCompanyController {
  constructor(private readonly companyService: CleaningCompanyService) {}

  @Post()
  async register(@Body() dto: CreateCleaningCompanyDto): Promise<CreateCompanyResponse> {
    return this.companyService.create(dto);
  }

  @Get()
  async findAll(): Promise<CleaningCompanyEntity[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number): Promise<CleaningCompanyEntity> {
    return this.companyService.findById(id);
  }

  @Patch(':id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateCleaningCompanyDto>,
  ): Promise<CleaningCompanyEntity> {
    return this.companyService.update(id, dto);
  }
}
