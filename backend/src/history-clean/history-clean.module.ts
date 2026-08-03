import { Module } from '@nestjs/common';
import { HistoryCleanService } from './history-clean.service';
import { HistoryCleanController } from './history-clean.controller';

@Module({
  controllers: [HistoryCleanController],
  providers: [HistoryCleanService],
})
export class HistoryCleanModule {}
