import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Role} from "./enum/user.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createUserRoleDto: CreateUserDto): Promise<UserRole> {
    const existingRole = await this.userRoleRepository.findOne({
      where: { name: createUserRoleDto.name },
    });

    if (existingRole) {
      throw new ConflictException('Роль с таким наименованием уже существует');
    }

    const newRole = this.userRoleRepository.create(createUserRoleDto);
    return await this.userRoleRepository.save(newRole);
  }

  async findAll(): Promise<UserRole[]> {
    return await this.userRoleRepository.find();
  }

  async findOne(id: number): Promise<UserRole> {
    const role = await this.userRoleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Роль с ID #${id} не найдена`);
    }
    return role;
  }

  async update(id: number, updateUserRoleDto: UpdateUserDto): Promise<UserRole> {
    const role = await this.findOne(id);
    Object.assign(role, updateUserRoleDto);
    return await this.userRoleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.userRoleRepository.remove(role);
  }

  async onModuleInit() {
    const count = await this.userRoleRepository.count();
    if (count === 0) {
      await this.userRoleRepository.save([
        { name: Role.CLIENT, description: 'Клиент (бронирование, поиск, отзывы)' },
        { name: Role.CLEANING_SERVICE, description: 'Клининговая служба (управление бронью)' },
        { name: Role.ADMIN, description: 'Администратор (управление пользователями)' },
      ]);
    }
  }

}