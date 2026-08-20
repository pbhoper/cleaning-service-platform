import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CleaningCompanyEntity } from '../cleaning-company/entities/cleaning-company.entity';
import {Booking} from "../booking/entities/booking.entity";
import {SearchQueryDto, SortBy} from "./dto/create-search.dto";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(CleaningCompanyEntity)
    private companyRepository: Repository<CleaningCompanyEntity>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async searchCompanies(query: SearchQueryDto) {
    const {
      lat,
      lng,
      areaSqM = 50,
      sortBy = SortBy.RATING,
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;

    const qb = this.companyRepository
      .createQueryBuilder('company')
      .leftJoin('bookings', 'booking', 'booking.companyId = company.id')
      .select([
        'company.id AS id',
        'company.name AS name',
        'company.logo AS logo',
        'company.address AS address',
        'company.rating AS rating',
        'company.pricePerSqM AS "pricePerSqM"',
      ])
      .addSelect('COUNT(booking.id)', 'popularity')
      .groupBy('company.id');

    if (lat && lng) {
      qb.addSelect(
        `(6371 * acos(cos(radians(:lat)) * cos(radians(company.latitude)) * cos(radians(company.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(company.latitude))))`,
        'distance',
      ).setParameters({ lat, lng });
    }

    if (sortBy === SortBy.POPULARITY) {
      qb.orderBy('popularity', sortOrder);
    } else if (sortBy === SortBy.PRICE) {
      qb.orderBy('company.pricePerSqM', sortOrder);
    } else if (sortBy === SortBy.DISTANCE && lat && lng) {
      qb.orderBy('distance', sortOrder === 'DESC' ? 'DESC' : 'ASC');
    } else {
      qb.orderBy('company.rating', sortOrder);
    }

    qb.offset(skip).limit(limit);

    const rawItems = await qb.getRawMany();
    const total = await this.companyRepository.count();

    const items = rawItems.map((c) => ({
      id: c.id,
      name: c.name,
      logo: c.logo || null,
      address: c.address || '',
      rating: Number(c.rating || 0),
      estimatedPrice: Number(c.pricePerSqM || 0) * areaSqM,
      distanceKm: c.distance ? Number(Number(c.distance).toFixed(1)) : null,
      popularity: Number(c.popularity || 0),
    }));

    return {
      items,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + items.length < total,
      },
    };
  }
}