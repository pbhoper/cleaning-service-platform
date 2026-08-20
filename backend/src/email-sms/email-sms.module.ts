import { Module } from '@nestjs/common';
import { EmailSmsService } from './email-sms.service';
import { EmailSmsController } from './email-sms.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmailSmsEntity} from "./entities/email-sm.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EmailSmsEntity])],
  controllers: [EmailSmsController],
  providers: [EmailSmsService],
  exports: [EmailSmsService],
})
export class EmailSmsModule { }