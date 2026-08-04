import { Module } from '@nestjs/common';
import { CleaningCompanyService } from './cleaning-company.service';
import { CleaningCompanyController } from './cleaning-company.controller';

@Module({
  controllers: [CleaningCompanyController],
  providers: [CleaningCompanyService],
})
export class CleaningCompanyModule {}
