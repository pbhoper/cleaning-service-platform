import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EmailSmsService } from './email-sms.service';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';

@Controller('email-sms')
export class EmailSmsController {
  constructor(private readonly emailSmsService: EmailSmsService) {}

  @Post()
  async create(@Body() createEmailSmDto: CreateEmailSmDto) {
    return this.emailSmsService.create(createEmailSmDto);
  }

  @Get()
  async findAll() {
    return this.emailSmsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.emailSmsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.emailSmsService.remove(+id);
  }
}
