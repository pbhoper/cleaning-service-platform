import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailSmDto } from './create-email-sm.dto';

export class UpdateEmailSmDto extends PartialType(CreateEmailSmDto) {}
