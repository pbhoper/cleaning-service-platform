import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  name: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Телефон обязателен' })
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  isCorporate?: boolean;

  @IsBoolean()
  @IsOptional()
  notificationsEnabled?: boolean;

  @IsNumber()
  @IsOptional()
  notificationHours?: number;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
