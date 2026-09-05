import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';
import { EmailSmsEntity, NotificationType, NotificationStatus } from './entities/email-sm.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailSmsService {
  private readonly transporter;

  constructor(
    @InjectRepository(EmailSmsEntity)
    private readonly emailSmsRepository: Repository<EmailSmsEntity>,
  ) {
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
    const { type, recipient, message } = createEmailSmDto;

    let status = NotificationStatus.SUCCESS;
    let errorMessage: string | undefined = undefined;

    if (type === 'email') {
      try {
        await this.transporter.sendMail({
          from: '"Cleaning Service" <no-reply@cleaning.com>',
          to: recipient,
          subject: 'Уведомление о заказе уборки',
          text: message,
        });
      } catch (error: unknown) {
        status = NotificationStatus.FAILED;
        errorMessage = error instanceof Error ? error.message : 'Не удалось отправить email';
      }
    } else if (type === 'sms') {
      console.log(`Отправка SMS на номер ${recipient}: ${message}`);
    }

    const notification = this.emailSmsRepository.create({
      type: type,
      recipient,
      message,
      status,
      errorMessage,
    });

    return await this.emailSmsRepository.save(notification);
  }

  async findAll() {
    return await this.emailSmsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const notification = await this.emailSmsRepository.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException(`Уведомление #${id} не найдено`);
    }

    return notification;
  }

  async remove(id: number) {
    const result = await this.emailSmsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Уведомление #${id} не найдено`);
    }

    return { success: true, message: `Сообщение #${id} удалено` };
  }
}
