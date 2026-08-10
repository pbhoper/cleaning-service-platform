import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchEntity } from './entities/search.entity';
import { SearchQueryDto } from './dto/create-search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchEntity)
    private readonly searchRepository: Repository<SearchEntity>,
  ) { }

  async findCompanies(query: SearchQueryDto) {
    const {
      location,
      cleaningType,
      schedule,
      date,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder = 'ASC',
      page = 1,
      limit = 10,
    } = query;

    const queryBuilder = this.searchRepository.createQueryBuilder('company');

    if (location) {
      queryBuilder.andWhere('company.location ILIKE :location', { location: '%' + location + '%' });
    }

    if (cleaningType) {
      queryBuilder.andWhere('company.cleaningType = :cleaningType', { cleaningType });
    }

    if (schedule) {
      queryBuilder.andWhere('company.schedule = :schedule', { schedule });
    }

    if (date) {
      queryBuilder.andWhere('company.availableDate = :date::date', { date });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('company.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('company.price <= :maxPrice', { maxPrice });
    }

    if (sortBy) {
      const allowedSortFields = ['price', 'rating', 'availableDate'];

      if (allowedSortFields.includes(sortBy)) {
        queryBuilder.orderBy('company.' + sortBy, sortOrder);
      } else {
        throw new BadRequestException('Сортировка по данному полю не поддерживается');
      }
    } else {
      queryBuilder.orderBy('company.id', 'DESC');
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}