import { Injectable } from '@nestjs/common';

export interface CleaningHistoryItem {
  id: number;
  userId: number;
  companyId: number;
  companyName: string;
  serviceType: string;
  address: string;
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
  price: number;
  estimatedTimeMinutes: number;
  status: string;
  createdAt: string;
}

export interface HistoryResponse {
  success: boolean;
  data: CleaningHistoryItem[];
}

@Injectable()
export class HistoryCleanService {
  private readonly cleaningHistory: CleaningHistoryItem[] = [
    {
      id: 1,
      userId: 1,
      companyId: 1,
      companyName: 'Чистый Дом',
      serviceType: 'Генеральная уборка',
      address: 'ул. Ленина, д. 45, кв. 12',
      smallRooms: 2,
      largeRooms: 1,
      bathrooms: 1,
      price: 5000,
      estimatedTimeMinutes: 240,
      status: 'confirmed',
      createdAt: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 2,
      userId: 1,
      companyId: 2,
      companyName: 'ЭкоКлининг',
      serviceType: 'Поддерживающая уборка',
      address: 'пр. Мира, д. 10, кв. 88',
      smallRooms: 1,
      largeRooms: 1,
      bathrooms: 1,
      price: 2500,
      estimatedTimeMinutes: 120,
      status: 'open',
      createdAt: '2026-02-15T14:30:00.000Z',
    },
  ];

  getHistoryByUserId(userId: number): HistoryResponse {
    const userOrders = this.cleaningHistory.filter((order) => order.userId === Number(userId));
    return {
      success: true,
      data: userOrders,
    };
  }
}
