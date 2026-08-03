import { Injectable } from '@nestjs/common';
import { CreateToBookDto } from './dto/create-to-book.dto';
import { UpdateToBookDto } from './dto/update-to-book.dto';

@Injectable()
export class ToBookService {
  create(createToBookDto: CreateToBookDto) {
    return 'This action adds a new toBook';
  }

  findAll() {
    return `This action returns all toBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toBook`;
  }

  update(id: number, updateToBookDto: UpdateToBookDto) {
    return `This action updates a #${id} toBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} toBook`;
  }
}
