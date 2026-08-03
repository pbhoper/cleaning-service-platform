import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuth } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: RegisterAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: LoginAuth) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
