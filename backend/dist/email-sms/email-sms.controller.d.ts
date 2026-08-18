import { EmailSmsService } from './email-sms.service';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';
export declare class EmailSmsController {
    private readonly emailSmsService;
    constructor(emailSmsService: EmailSmsService);
    create(createEmailSmDto: CreateEmailSmDto): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
    } | undefined>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
