import {
  Controller,
  Post,
  Body,
  Get
} from '@nestjs/common';
import { ToBookService } from './to-book.service';
import { CreateToBookDto } from './dto/create-to-book.dto';

@Controller('booking')
export class ToBookController {
  constructor(private readonly toBookService: ToBookService) { }

  @Post()
  async createBooking(@Body() dto: CreateToBookDto) {

    const mockClientId = 1;

    return this.toBookService.createBooking(mockClientId, dto);
  }

  @Get('my-bookings')
  async getMyBookings() {
    const mockClientId = 1;

    return this.toBookService.getClientBookings(mockClientId);
  }
}