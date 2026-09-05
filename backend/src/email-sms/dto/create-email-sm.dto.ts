import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { NotificationType } from '../entities/email-sm.entity';

export class CreateEmailSmDto {
  @IsNotEmpty()
  @IsString()
  recipient: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;
}
