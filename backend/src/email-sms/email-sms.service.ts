import { Injectable } from '@nestjs/common';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailSmsService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'ваш_user',
        pass: 'ваш_pass',
      },
    });
  }

  async create(createEmailSmDto: CreateEmailSmDto) {
    if (createEmailSmDto.type === 'email') {

      try {
        await this.transporter.sendMail({
          from: '"Cleaning Service" <no-reply@cleaning.com>',
          to: createEmailSmDto.recipient,
          subject: 'Уведомление о заказе уборки',
          text: createEmailSmDto.message,
        });
        return { success: true, message: 'Email успешно отправлен!' };
      } catch (error) {
        return { success: false, error: error.message };
      }
    } else if (createEmailSmDto.type === 'sms') {

      console.log(`[SMS] Отправка на номер ${createEmailSmDto.recipient}: ${createEmailSmDto.message}`);
      return { success: true, message: 'SMS симуляция: отправлено!' };
    }
  }

  findAll() {
    return 'Возврат истории всех сообщений';
  }

  findOne(id: number) {
    return `Сообщение с ID #${id}`;
  }

  remove(id: number) {
    return `Удаление сообщения #${id}`;
  }
}