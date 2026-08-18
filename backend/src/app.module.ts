import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ToBookModule } from './to-book/to-book.module';
import { HistoryCleanModule } from './history-clean/history-clean.module';
import { RatedModule } from './rated/rated.module';
import { OrderModule } from './order/order.module';
import { EmailSmsModule } from './email-sms/email-sms.module';
import {CleaningCompanyModule} from "./cleaning-company/cleaning-company.module";
import {TypeOrmModule} from "@nestjs/typeorm";

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
    SearchModule,
    ToBookModule,
    HistoryCleanModule,
    RatedModule,
    OrderModule,
    EmailSmsModule,
    CleaningCompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}