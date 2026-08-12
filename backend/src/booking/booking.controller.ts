import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Request
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {BookingStatus} from "./enum/booking.enum";
import {Role} from "../user-role/enum/user-role.enum";
import {Roles} from "../user-role/guards/roles.decorator";
import {RolesGuard} from "../user-role/guards/roles.guards";


@Controller('bookings')
@UseGuards(RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Roles(Role.CLIENT)
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.create(createBookingDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.bookingService.findAllForUser(req.user);
  }

  @Patch(':id/status')
  @Roles(Role.CLEANING_SERVICE)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
    @Request() req,
  ) {
    return this.bookingService.updateStatus(id, status, req.user);
  }
}