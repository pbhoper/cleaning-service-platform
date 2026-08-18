import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRoleService {
    private readonly userRoleRepository;
    constructor(userRoleRepository: Repository<UserRole>);
    create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole>;
    findAll(): Promise<UserRole[]>;
    findOne(id: number): Promise<UserRole>;
    update(id: number, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole>;
    remove(id: number): Promise<void>;
    onModuleInit(): Promise<void>;
}
