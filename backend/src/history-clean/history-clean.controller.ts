import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HistoryCleanService, type HistoryResponse } from './history-clean.service';

@Controller('history-clean')
export class HistoryCleanController {
  constructor(private readonly historyCleanService: HistoryCleanService) {}

  @Get('user/:userId')
  getHistoryByUserId(@Param('userId', ParseIntPipe) userId: number): HistoryResponse {
    return this.historyCleanService.getHistoryByUserId(userId);
  }
}
