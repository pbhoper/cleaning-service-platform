import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateSearchDto {

  @IsString()
  @IsNotEmpty()
  position: string

  @IsNumber()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  schedule: number;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsString()
  @IsNotEmpty()
  type: string
}
