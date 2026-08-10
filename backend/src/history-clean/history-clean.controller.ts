import { Controller, Get, Param } from '@nestjs/common';
import { HistoryCleanService } from './history-clean.service';

@Controller('history-clean')
export class HistoryCleanController {
  constructor(private readonly historyCleanService: HistoryCleanService) { }

  @Get('user/:userId')
  async getHistory(@Param('userId') userId: string) {
    return await this.historyCleanService.getHistoryByUserId(userId);
  }
}