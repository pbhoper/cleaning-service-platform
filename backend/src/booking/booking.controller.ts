import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Role } from '../user-role/enum/user.enum';
import { Roles } from '../user-role/guards/roles.decorator';
import { RolesGuard } from '../user-role/guards/roles.guards';
import { UserRole } from '../user-role/entities/user.entity';
import { Booking } from './entities/booking.entity';
import * as bookingEnum from './consts/booking.enum';

interface RequestWithUser extends ExpressRequest {
  user: UserRole;
}

@Controller('bookings')
@UseGuards(RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Roles(Role.CLIENT)
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req: RequestWithUser,
  ): Promise<Booking> {
    return this.bookingService.create(createBookingDto, req.user);
  }

  @Get()
  async findAll(@Request() req: RequestWithUser): Promise<Booking[]> {
    return this.bookingService.findAllForUser(req.user);
  }

  @Patch(':id/status')
  @Roles(Role.CLEANING_SERVICE)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: bookingEnum.BookingStatus,
    @Request() req: RequestWithUser,
  ): Promise<Booking> {
    return this.bookingService.updateStatus(id, status, req.user);
  }
}
