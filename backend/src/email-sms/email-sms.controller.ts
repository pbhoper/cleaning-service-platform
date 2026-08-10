import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailSmsService } from './email-sms.service';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';

@Controller('email-sms')
export class EmailSmsController {
  constructor(private readonly emailSmsService: EmailSmsService) { }

  @Post()
  create(@Body() createEmailSmDto: CreateEmailSmDto) {
    return this.emailSmsService.create(createEmailSmDto);
  }

  @Get()
  findAll() {
    return this.emailSmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailSmsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailSmsService.remove(+id);
  }
}
