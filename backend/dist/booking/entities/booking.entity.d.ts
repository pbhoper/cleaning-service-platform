import { UserRole } from "../../user-role/entities/user.entity";
import * as bookingEnum from "../consts/booking.enum";
export declare class Booking {
    id: string;
    client: UserRole;
    company: UserRole;
    address: string;
    areaSqM: number;
    totalPrice: number;
    status: bookingEnum.BookingStatus;
    scheduledAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
