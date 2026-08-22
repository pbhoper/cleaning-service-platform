import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ToBookModule } from './to-book/to-book.module';
import { HistoryCleanModule } from './history-clean/history-clean.module';
import { RatingModule } from './rated/rating.module';
import { OrderModule } from './order/order.module';
import { EmailSmsModule } from './email-sms/email-sms.module';
import {CleaningCompanyModule} from "./cleaning-company/cleaning-company.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user-role/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'poiuytrewq123.com',
      database: 'cleaning_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    SearchModule,
    ToBookModule,
    HistoryCleanModule,
    RatingModule,
    OrderModule,
    EmailSmsModule,
    CleaningCompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}