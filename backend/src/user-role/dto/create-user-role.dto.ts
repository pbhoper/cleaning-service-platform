import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';
import {Role} from "../enum/user-role.enum";

export class CreateUserRoleDto {
  @IsEnum(Role, { message: 'Указана недопустимая роль' })
  name: Role;

  @IsString()
  @IsOptional()
  description?: string;
}