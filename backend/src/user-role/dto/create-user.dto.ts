import {
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';
import {Role} from "../enum/user.enum";

export class CreateUserDto {
  @IsEnum(Role, { message: 'Указана недопустимая роль' })
  name: Role;

  @IsString()
  @IsOptional()
  description?: string;
}