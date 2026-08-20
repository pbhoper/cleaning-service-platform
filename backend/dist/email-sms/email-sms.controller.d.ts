import { EmailSmsService } from './email-sms.service';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';
export declare class EmailSmsController {
    private readonly emailSmsService;
    constructor(emailSmsService: EmailSmsService);
    create(createEmailSmDto: CreateEmailSmDto): Promise<import("./entities/email-sm.entity").EmailSmsEntity>;
    findAll(): Promise<import("./entities/email-sm.entity").EmailSmsEntity[]>;
    findOne(id: string): Promise<import("./entities/email-sm.entity").EmailSmsEntity>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
