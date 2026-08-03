import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToBookService } from './to-book.service';
import { CreateToBookDto } from './dto/create-to-book.dto';
import { UpdateToBookDto } from './dto/update-to-book.dto';

@Controller('to-book')
export class ToBookController {
  constructor(private readonly toBookService: ToBookService) {}

  @Post()
  create(@Body() createToBookDto: CreateToBookDto) {
    return this.toBookService.create(createToBookDto);
  }

  @Get()
  findAll() {
    return this.toBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToBookDto: UpdateToBookDto) {
    return this.toBookService.update(+id, updateToBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toBookService.remove(+id);
  }
}
