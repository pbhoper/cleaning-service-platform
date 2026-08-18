import { Repository } from 'typeorm';
import { ToBookEntity } from './entities/to-book.entity';
import { CreateToBookDto } from './dto/create-to-book.dto';
export declare class ToBookService {
    private readonly toBookRepository;
    constructor(toBookRepository: Repository<ToBookEntity>);
    createBooking(clientId: number, dto: CreateToBookDto): Promise<ToBookEntity>;
    getClientBookings(clientId: number): Promise<ToBookEntity[]>;
}
