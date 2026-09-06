import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EmailSmsService } from './email-sms.service';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';
import { EmailSmsEntity } from './entities/email-sm.entity';

@Controller('email-sms')
export class EmailSmsController {
  constructor(private readonly emailSmsService: EmailSmsService) {}

  @Post()
  async create(@Body() createEmailSmDto: CreateEmailSmDto): Promise<EmailSmsEntity> {
    return this.emailSmsService.create(createEmailSmDto);
  }

  @Get()
  async findAll(): Promise<EmailSmsEntity[]> {
    return this.emailSmsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EmailSmsEntity> {
    return this.emailSmsService.findOne(id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean; message: string }> {
    return this.emailSmsService.remove(id);
  }
}
