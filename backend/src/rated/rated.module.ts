import { Module } from '@nestjs/common';
import { RatedService } from './rated.service';
import { RatedController } from './rated.controller';

@Module({
  controllers: [RatedController],
  providers: [RatedService],
})
export class RatedModule {}
