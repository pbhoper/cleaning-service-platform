import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CliningCompanyService } from './clining-company.service';
import { CreateCliningCompanyDto } from './dto/create-clining-company.dto';
import { UpdateCliningCompanyDto } from './dto/update-clining-company.dto';

@Controller('clining-company')
export class CliningCompanyController {
  constructor(private readonly cliningCompanyService: CliningCompanyService) {}

  @Post()
  create(@Body() createCliningCompanyDto: CreateCliningCompanyDto) {
    return this.cliningCompanyService.create(createCliningCompanyDto);
  }

  @Get()
  findAll() {
    return this.cliningCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cliningCompanyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCliningCompanyDto: UpdateCliningCompanyDto) {
    return this.cliningCompanyService.update(+id, updateCliningCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cliningCompanyService.remove(+id);
  }
}
