import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CleaningCompanyService } from './cleaning-company.service';
import { CleaningCompanyController } from './cleaning-company.controller';
import { CleaningCompanyEntity } from './entities/cleaning-company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CleaningCompanyEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [CleaningCompanyController],
  providers: [CleaningCompanyService],
  exports: [CleaningCompanyService],
})
export class CleaningCompanyModule {}
