import { Module } from '@nestjs/common';
import { ToBookService } from './to-book.service';
import { ToBookController } from './to-book.controller';

@Module({
  controllers: [ToBookController],
  providers: [ToBookService],
})
export class ToBookModule {}
