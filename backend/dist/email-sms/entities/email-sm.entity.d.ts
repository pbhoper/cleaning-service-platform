export declare enum NotificationType {
    EMAIL = "email",
    SMS = "sms"
}
export declare enum NotificationStatus {
    SUCCESS = "success",
    FAILED = "failed"
}
export declare class EmailSmsEntity {
    id: number;
    type: NotificationType;
    recipient: string;
    message: string;
    status: NotificationStatus;
    errorMessage?: string;
    createdAt: Date;
}
