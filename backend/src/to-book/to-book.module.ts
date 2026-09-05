import { Module } from '@nestjs/common';
import { ToBookService } from './to-book.service';
import { ToBookController } from './to-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToBookEntity } from './entities/to-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToBookEntity])],
  controllers: [ToBookController],
  providers: [ToBookService],
  exports: [ToBookService],
})
export class ToBookModule {}
