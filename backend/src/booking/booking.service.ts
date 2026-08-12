import {
  Injectable,
  NotFoundException,
  BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserRole} from "../user-role/entities/user-role.entity";
import {BookingStatus} from "./enum/booking.enum";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto, client: UserRole): Promise<Booking> {
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      client,
      scheduledAt: new Date(createBookingDto.scheduledAt),
      status: BookingStatus.PENDING,
    });

    return await this.bookingRepository.save(booking);
  }

  async findAllForUser(user: UserRole): Promise<Booking[]> {
    if (user.role.name === 'ADMIN') {
      return await this.bookingRepository.find();
    }
    if (user.role.name === 'CLEANING_SERVICE') {
      return await this.bookingRepository.find({ where: [{ company: { id: user.id } }, { status: BookingStatus.PENDING }] });
    }
    return await this.bookingRepository.find({ where: { client: { id: user.id } } });
  }

  async updateStatus(id: string, status: BookingStatus, company: UserRole): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException('Бронирование не найдено');
    }

    if (booking.status === BookingStatus.CANCELED || booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Нельзя изменить статус завершенного или отмененного заказа');
    }

    booking.status = status;
    booking.company = company;

    return await this.bookingRepository.save(booking);
  }
}