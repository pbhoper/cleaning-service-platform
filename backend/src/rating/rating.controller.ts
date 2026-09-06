import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import {
  RatingService,
  type CreateRatingData,
  type CreateRatingResponse,
  type GetCompanyRatingsResponse,
} from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratedService: RatingService) {}

  @Post()
  rateCompany(@Body() body: CreateRatingData): CreateRatingResponse {
    return this.ratedService.createRating(body);
  }

  @Get('company/:companyId')
  getRatings(@Param('companyId') companyId: string): GetCompanyRatingsResponse {
    return this.ratedService.getCompanyRatings(companyId);
  }
}
