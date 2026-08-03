import { Injectable } from '@nestjs/common';
import { CreateCliningCompanyDto } from './dto/create-clining-company.dto';
import { UpdateCliningCompanyDto } from './dto/update-clining-company.dto';

@Injectable()
export class CliningCompanyService {
  create(createCliningCompanyDto: CreateCliningCompanyDto) {
    return 'This action adds a new cliningCompany';
  }

  findAll() {
    return `This action returns all cliningCompany`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliningCompany`;
  }

  update(id: number, updateCliningCompanyDto: UpdateCliningCompanyDto) {
    return `This action updates a #${id} cliningCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliningCompany`;
  }
}
