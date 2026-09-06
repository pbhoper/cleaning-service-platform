import { Controller, Post, Body, Get } from '@nestjs/common';
import { ToBookService } from './to-book.service';
import { CreateToBookDto } from './dto/create-to-book.dto';
import type { ToBookEntity } from './entities/to-book.entity';

@Controller('booking')
export class ToBookController {
  constructor(private readonly toBookService: ToBookService) {}

  @Post()
  async createBooking(@Body() dto: CreateToBookDto): Promise<ToBookEntity> {
    const mockClientId = 1;

    return this.toBookService.createBooking(mockClientId, dto);
  }

  @Get('my-bookings')
  async getMyBookings(): Promise<ToBookEntity[]> {
    const mockClientId = 1;

    return this.toBookService.getClientBookings(mockClientId);
  }
}
