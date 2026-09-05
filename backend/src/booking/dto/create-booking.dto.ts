import { IsString, IsNumber, IsPositive, IsDateString, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  address: string;

  @IsNumber()
  @IsPositive()
  areaSqM: number;

  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}
