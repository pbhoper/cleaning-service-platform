export declare enum RecurringFrequency {
    NONE = "NONE",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY"
}
export declare class CreateToBookDto {
    companyId: number;
    address: string;
    bookingDate: string;
    isRecurring?: boolean;
    recurringFrequency?: RecurringFrequency;
}
