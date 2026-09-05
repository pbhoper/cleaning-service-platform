import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsObject,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateCleaningCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'Название компании обязательно' })
  name: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Телефон обязателен' })
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  pricePerSqM?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsArray()
  @IsNotEmpty({ message: 'Выберите хотя бы один тип оказываемых услуг' })
  serviceTypes: string[];

  @IsObject()
  @IsNotEmpty()
  basePrices: {
    smallRoom: number;
    largeRoom: number;
    bathroom: number;
  };

  @IsObject()
  @IsNotEmpty()
  coefficients: Record<string, number>;
}
