import {IsNotEmpty, IsNumber} from "class-validator";

export class UpdateClientDto {

  @IsNumber()
  @IsNotEmpty()
  client: number;
}
