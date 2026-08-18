import { ToBookService } from './to-book.service';
import { CreateToBookDto } from './dto/create-to-book.dto';
export declare class ToBookController {
    private readonly toBookService;
    constructor(toBookService: ToBookService);
    createBooking(dto: CreateToBookDto): Promise<import("./entities/to-book.entity").ToBookEntity>;
    getMyBookings(): Promise<import("./entities/to-book.entity").ToBookEntity[]>;
}
