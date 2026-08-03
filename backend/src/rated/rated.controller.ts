import { Controller } from '@nestjs/common';
import { RatedService } from './rated.service';

@Controller('rated')
export class RatedController {
  constructor(private readonly ratedService: RatedService) {}
}
