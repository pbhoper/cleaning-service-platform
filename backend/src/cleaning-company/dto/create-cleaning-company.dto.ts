import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class CreateCleaningCompanyDto {
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
}
