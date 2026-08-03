import { Controller } from '@nestjs/common';
import { HistoryCleanService } from './history-clean.service';

@Controller('history-clean')
export class HistoryCleanController {
  constructor(private readonly historyCleanService: HistoryCleanService) {}
}
