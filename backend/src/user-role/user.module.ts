import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRole } from './entities/user.entity';
import {UserService} from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}