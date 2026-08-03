import { PartialType } from '@nestjs/mapped-types';
import { CreateCliningCompanyDto } from './create-clining-company.dto';

export class UpdateCliningCompanyDto extends PartialType(CreateCliningCompanyDto) {}
