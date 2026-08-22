import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratedService: RatingService) { }

  @Post()
  async rateCompany(@Body() body: { clientId: string; companyId: string; rating: number; comment?: string }) {
    return await this.ratedService.createRating(body);
  }

  @Get('company/:companyId')
  async getRatings(@Param('companyId') companyId: string) {
    return await this.ratedService.getCompanyRatings(companyId);
  }
}