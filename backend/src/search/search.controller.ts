import { Controller, Get, Query } from '@nestjs/common';
import { SearchService, type SearchResponse } from './search.service';
import { SearchQueryDto } from './dto/create-search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchCompanies(@Query() query: SearchQueryDto): Promise<SearchResponse> {
    return this.searchService.searchCompanies(query);
  }
}
