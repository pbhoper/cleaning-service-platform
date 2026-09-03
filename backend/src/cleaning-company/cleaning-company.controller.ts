import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { CleaningCompanyService } from './cleaning-company.service';
import { CreateCleaningCompanyDto } from './dto/create-cleaning-company.dto';

@Controller('cleaning-company')
export class CleaningCompanyController {
  constructor(private readonly companyService: CleaningCompanyService) {}

  @Post()
  async register(@Body() dto: CreateCleaningCompanyDto) {
    return this.companyService.create(dto);
  }

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findById(id);
  }

  @Patch(':id')
  async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateCleaningCompanyDto>,) {
    return this.companyService.update(id, dto);
  }
}