import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum RecurringFrequency {
  NONE = 'NONE',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
}

export class CreateToBookDto {
  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsDateString()
  bookingDate: string;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @IsOptional()
  @IsEnum(RecurringFrequency)
  recurringFrequency?: RecurringFrequency;
}
