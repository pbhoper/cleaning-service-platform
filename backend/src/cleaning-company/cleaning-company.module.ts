import { Module } from '@nestjs/common';
import { CleaningCompanyService } from './cleaning-company.service';
import { CleaningCompanyController } from './cleaning-company.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CleaningCompanyEntity} from "./entities/cleaning-company.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CleaningCompanyEntity])],
  controllers: [CleaningCompanyController],
  providers: [CleaningCompanyService],
})
export class CleaningCompanyModule {}
