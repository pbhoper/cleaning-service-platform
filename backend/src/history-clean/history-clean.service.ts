import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryCleanService {

  private readonly cleaningHistory = [
    { id: 1, date: '2026-06-01', serviceType: 'Генеральная уборка', status: 'Завершено', price: 5000 },
    { id: 2, date: '2026-06-15', serviceType: 'Поддерживающая уборка', status: 'Завершено', price: 2500 },
  ];

  async getHistoryByUserId(userId: string) {

    return {
      success: true,
      data: this.cleaningHistory,
    };
  }
}