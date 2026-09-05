import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Role } from '../user-role/enum/user.enum';
import { Roles } from '../user-role/guards/roles.decorator';
import { RolesGuard } from '../user-role/guards/roles.guards';
import * as bookingEnum from './consts/booking.enum';

@Controller('bookings')
@UseGuards(RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Roles(Role.CLIENT)
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.create(createBookingDto, req.user);
  }

  @Get()
  async findAll(@Request() req) {
    return this.bookingService.findAllForUser(req.user);
  }

  @Patch(':id/status')
  @Roles(Role.CLEANING_SERVICE)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: bookingEnum.BookingStatus,
    @Request() req,
  ) {
    return this.bookingService.updateStatus(id, status, req.user);
  }
}
