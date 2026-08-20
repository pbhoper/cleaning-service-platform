import { Repository } from 'typeorm';
import { CreateEmailSmDto } from './dto/create-email-sm.dto';
import { EmailSmsEntity } from './entities/email-sm.entity';
export declare class EmailSmsService {
    private readonly emailSmsRepository;
    private transporter;
    constructor(emailSmsRepository: Repository<EmailSmsEntity>);
    create(createEmailSmDto: CreateEmailSmDto): Promise<EmailSmsEntity>;
    findAll(): Promise<EmailSmsEntity[]>;
    findOne(id: number): Promise<EmailSmsEntity>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
