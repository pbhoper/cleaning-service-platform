import { NotificationType } from '../entities/email-sm.entity';
export declare class CreateEmailSmDto {
    recipient: string;
    message: string;
    type: NotificationType;
}
