import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ToBookModule } from './to-book/to-book.module';
import { HistoryCleanModule } from './history-clean/history-clean.module';
import { RatedModule } from './rated/rated.module';
import { OrderModule } from './order/order.module';
import { EmailSmsModule } from './email-sms/email-sms.module';
import { CliningCompanyModule } from './clining-company/clining-company.module';

@Module({
  imports: [SearchModule, ToBookModule, HistoryCleanModule, RatedModule, OrderModule, EmailSmsModule, CliningCompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}