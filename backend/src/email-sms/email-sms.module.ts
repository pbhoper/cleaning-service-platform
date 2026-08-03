import { Module } from '@nestjs/common';
import { EmailSmsService } from './email-sms.service';
import { EmailSmsController } from './email-sms.controller';

@Module({
  controllers: [EmailSmsController],
  providers: [EmailSmsService],
})
export class EmailSmsModule {}
