import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CleaningCompanyService } from './cleaning-company.service';
import {CreateCleaningCompanyDto} from "./dto/create-cleaning-company.dto";

@Controller('cleaning-company')
export class CleaningCompanyController {
  constructor(private readonly companyService: CleaningCompanyService) {}

  @Post()
  async register(@Body() dto: CreateCleaningCompanyDto) {
    return this.companyService.create(dto);
  }

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findById(id);
  }
}