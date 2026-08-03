import { Module } from '@nestjs/common';
import { CliningCompanyService } from './clining-company.service';
import { CliningCompanyController } from './clining-company.controller';

@Module({
  controllers: [CliningCompanyController],
  providers: [CliningCompanyService],
})
export class CliningCompanyModule {}
