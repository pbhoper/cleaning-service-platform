import { Injectable } from '@nestjs/common';

export interface RatingItem {
  id: number;
  clientId: string;
  companyId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

@Injectable()
export class RatingService {

  private readonly ratings: RatingItem[] = [];

  async createRating(rateData: { clientId: string; companyId: string; rating: number; comment?: string }) {
    const newRating: RatingItem = {
      id: this.ratings.length + 1,
      ...rateData,
      createdAt: new Date(),
    };

    this.ratings.push(newRating);

    return {
      success: true,
      message: 'Рейтинг успешно сохранен',
      data: newRating,
    };
  }

  async getCompanyRatings(companyId: string) {
    const companyRatings = this.ratings.filter(r => r.companyId === companyId);
    return {
      success: true,
      data: companyRatings,
    };
  }
}