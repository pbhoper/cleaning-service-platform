import { Injectable } from '@nestjs/common';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';
import { UpdateEmailSmDto } from './dto/update-email-sm.dto';

@Injectable()
export class EmailSmsService {
  create(createEmailSmDto: CreateEmailSmDto) {
    return 'This action adds a new emailSm';
  }

  findAll() {
    return `This action returns all emailSms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailSm`;
  }

  update(id: number, updateEmailSmDto: UpdateEmailSmDto) {
    return `This action updates a #${id} emailSm`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailSm`;
  }
}
