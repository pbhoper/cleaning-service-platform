import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CleaningCompanyService } from './cleaning-company.service';
import { CreateCleaningCompanyDto } from './dto/create-cleaning-company.dto';
import { UpdateCleaningCompanyDto } from './dto/update-cleaning-company.dto';

@Controller('cleaning-company')
export class CleaningCompanyController {
  constructor(private readonly cleaningCompanyService: CleaningCompanyService) {}

  @Post()
  create(@Body() createCleaningCompanyDto: CreateCleaningCompanyDto) {
    return this.cleaningCompanyService.create(createCleaningCompanyDto);
  }

  @Get()
  findAll() {
    return this.cleaningCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cleaningCompanyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCleaningCompanyDto: UpdateCleaningCompanyDto) {
    return this.cleaningCompanyService.update(id, updateCleaningCompanyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cleaningCompanyService.remove(id);
  }
}
