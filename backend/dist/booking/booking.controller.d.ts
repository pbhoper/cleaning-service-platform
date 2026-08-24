import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import * as bookingEnum from "./consts/booking.enum";
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(createBookingDto: CreateBookingDto, req: any): Promise<import("./entities/booking.entity").Booking>;
    findAll(req: any): Promise<import("./entities/booking.entity").Booking[]>;
    updateStatus(id: string, status: bookingEnum.BookingStatus, req: any): Promise<import("./entities/booking.entity").Booking>;
}
