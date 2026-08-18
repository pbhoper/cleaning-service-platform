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
        user: 'user',
        pass: 'pass',
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
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Не удалось отправить email';

        return { success: false, error: message };
      }
    }

    if (createEmailSmDto.type === 'sms') {
      console.log(
        `Отправка на номер ${createEmailSmDto.recipient}: ${createEmailSmDto.message}`,
      );

      return { success: true, message: 'SMS отправлено!' };
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