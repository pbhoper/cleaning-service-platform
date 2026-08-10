import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RatedService } from './rated.service';
import { RatingItem } from './rated.service';

@Controller('rated')
export class RatedController {
  constructor(private readonly ratedService: RatedService) { }

  @Post()
  async rateCompany(@Body() body: { clientId: string; companyId: string; rating: number; comment?: string }) {
    return await this.ratedService.createRating(body);
  }

  @Get('company/:companyId')
  async getRatings(@Param('companyId') companyId: string) {
    return await this.ratedService.getCompanyRatings(companyId);
  }
}