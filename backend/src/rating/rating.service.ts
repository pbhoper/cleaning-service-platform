import { Injectable } from '@nestjs/common';

export interface RatingItem {
  id: number;
  clientId: string;
  companyId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface CreateRatingData {
  clientId: string;
  companyId: string;
  rating: number;
  comment?: string;
}

export interface CreateRatingResponse {
  success: boolean;
  message: string;
  data: RatingItem;
}

export interface GetCompanyRatingsResponse {
  success: boolean;
  data: RatingItem[];
}

@Injectable()
export class RatingService {
  private readonly ratings: RatingItem[] = [];

  createRating(rateData: CreateRatingData): CreateRatingResponse {
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

  getCompanyRatings(companyId: string): GetCompanyRatingsResponse {
    const companyRatings = this.ratings.filter((r) => r.companyId === companyId);
    return {
      success: true,
      data: companyRatings,
    };
  }
}
