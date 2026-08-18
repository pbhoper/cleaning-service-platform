import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto): Promise<import("./entities/client.entity").Client>;
    findAll(): Promise<import("./entities/client.entity").Client[]>;
    findOne(id: number): Promise<import("./entities/client.entity").Client>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<import("./entities/client.entity").Client>;
    remove(id: number): Promise<void>;
}
