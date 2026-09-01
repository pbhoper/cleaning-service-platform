import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryCleanService } from './history-clean.service';
import { HistoryCleanController } from './history-clean.controller';
import {Order} from "../order/entity/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [HistoryCleanController],
  providers: [HistoryCleanService],
  exports: [HistoryCleanService],
})
export class HistoryCleanModule {}