import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserRole } from "../user-role/entities/user-role.entity";
import { BookingStatus } from "./enum/booking.enum";
export declare class BookingService {
    private readonly bookingRepository;
    constructor(bookingRepository: Repository<Booking>);
    create(createBookingDto: CreateBookingDto, client: UserRole): Promise<Booking>;
    findAllForUser(user: UserRole): Promise<Booking[]>;
    updateStatus(id: string, status: BookingStatus, company: UserRole): Promise<Booking>;
}
