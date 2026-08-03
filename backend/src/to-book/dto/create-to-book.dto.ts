import { IsNotEmpty, IsString } from "class-validator";

export class CreateToBookDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  payment: string
}
