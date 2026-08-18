import { RecurringFrequency } from '../dto/create-to-book.dto';
export declare class ToBookEntity {
    id: number;
    clientId: number;
    companyId: number;
    address: string;
    bookingDate: string;
    isRecurring: boolean;
    recurringFrequency?: RecurringFrequency | string;
    status: string;
    createdAt: Date;
}
