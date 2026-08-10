import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/create-search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get()
  async searchCompanies(
    @Query(new ValidationPipe({ transform: true })) query: SearchQueryDto,
  ) {
    return this.searchService.findCompanies(query);
  }
}