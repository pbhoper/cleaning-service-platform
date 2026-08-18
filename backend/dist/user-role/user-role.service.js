"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_role_entity_1 = require("./entities/user-role.entity");
const user_role_enum_1 = require("./enum/user-role.enum");
let UserRoleService = class UserRoleService {
    userRoleRepository;
    constructor(userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }
    async create(createUserRoleDto) {
        const existingRole = await this.userRoleRepository.findOne({
            where: { name: createUserRoleDto.name },
        });
        if (existingRole) {
            throw new common_1.ConflictException('Роль с таким наименованием уже существует');
        }
        const newRole = this.userRoleRepository.create(createUserRoleDto);
        return await this.userRoleRepository.save(newRole);
    }
    async findAll() {
        return await this.userRoleRepository.find();
    }
    async findOne(id) {
        const role = await this.userRoleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException(`Роль с ID #${id} не найдена`);
        }
        return role;
    }
    async update(id, updateUserRoleDto) {
        const role = await this.findOne(id);
        Object.assign(role, updateUserRoleDto);
        return await this.userRoleRepository.save(role);
    }
    async remove(id) {
        const role = await this.findOne(id);
        await this.userRoleRepository.remove(role);
    }
    async onModuleInit() {
        const count = await this.userRoleRepository.count();
        if (count === 0) {
            await this.userRoleRepository.save([
                { name: user_role_enum_1.Role.CLIENT, description: 'Клиент (бронирование, поиск, отзывы)' },
                { name: user_role_enum_1.Role.CLEANING_SERVICE, description: 'Клининговая служба (управление бронью)' },
                { name: user_role_enum_1.Role.ADMIN, description: 'Администратор (управление пользователями)' },
            ]);
        }
    }
};
exports.UserRoleService = UserRoleService;
exports.UserRoleService = UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRoleService);
//# sourceMappingURL=user-role.service.js.map