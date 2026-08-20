import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { CleaningCompanyEntity } from '../cleaning-company/entities/cleaning-company.entity';
import {Booking} from "../booking/entities/booking.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CleaningCompanyEntity, Booking])],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}