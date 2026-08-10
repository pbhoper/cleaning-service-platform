import {
  IsNotEmpty,
  IsString,
  IsIn
} from 'class-validator';

export class CreateEmailSmDto {
  @IsNotEmpty()
  @IsString()
  recipient: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsIn(['email', 'sms'])
  type: 'email' | 'sms';
}