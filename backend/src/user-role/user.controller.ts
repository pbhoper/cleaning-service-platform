import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user-role')
export class UserController {
  constructor(private readonly userRoleService: UserService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userRoleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserRoleDto: UpdateUserDto) {
    return this.userRoleService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userRoleService.remove(id);
  }
}