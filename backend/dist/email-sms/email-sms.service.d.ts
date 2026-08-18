import { CreateEmailSmDto } from './dto/create-email-sm.dto';
export declare class EmailSmsService {
    private transporter;
    constructor();
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
    findOne(id: number): string;
    remove(id: number): string;
}
