import { UserRole } from "../../user-role/entities/user-role.entity";
import { BookingStatus } from "../enum/booking.enum";
export declare class Booking {
    id: string;
    client: UserRole;
    company: UserRole;
    address: string;
    areaSqM: number;
    totalPrice: number;
    status: BookingStatus;
    scheduledAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
