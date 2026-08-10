import {
  Injectable,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToBookEntity } from './entities/to-book.entity';
import { CreateToBookDto } from './dto/create-to-book.dto';

@Injectable()
export class ToBookService {
  constructor(
    @InjectRepository(ToBookEntity)
    private readonly toBookRepository: Repository<ToBookEntity>,
  ) { }

  async createBooking(clientId: number, dto: CreateToBookDto): Promise<ToBookEntity> {
    if (dto.isRecurring && !dto.recurringFrequency) {
      throw new BadRequestException('Укажите частоту для уборки');
    }

    const newBooking = this.toBookRepository.create({
      clientId: clientId,
      companyId: dto.companyId,
      address: dto.address,
      bookingDate: dto.bookingDate,
      isRecurring: dto.isRecurring || false,
      recurringFrequency: dto.isRecurring ? dto.recurringFrequency : undefined,
      status: 'PENDING',
    });

    return await this.toBookRepository.save(newBooking);
  }

  async getClientBookings(clientId: number): Promise<ToBookEntity[]> {
    return await this.toBookRepository.find({
      where: { clientId: clientId },
      order: { bookingDate: 'DESC' },
    });
  }
}