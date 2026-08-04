import { PartialType } from '@nestjs/mapped-types';
import { CreateCleaningCompanyDto } from './create-cleaning-company.dto';

export class UpdateCleaningCompanyDto extends PartialType(CreateCleaningCompanyDto) {}
