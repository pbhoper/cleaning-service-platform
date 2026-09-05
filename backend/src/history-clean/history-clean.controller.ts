import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HistoryCleanService } from './history-clean.service';

@Controller('history-clean')
export class HistoryCleanController {
  constructor(private readonly historyCleanService: HistoryCleanService) {}

  @Get('user/:userId')
  async getHistoryByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.historyCleanService.getHistoryByUserId(userId);
  }
}
