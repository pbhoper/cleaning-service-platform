"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const search_module_1 = require("./search/search.module");
const to_book_module_1 = require("./to-book/to-book.module");
const history_clean_module_1 = require("./history-clean/history-clean.module");
const order_module_1 = require("./order/order.module");
const email_sms_module_1 = require("./email-sms/email-sms.module");
const cleaning_company_module_1 = require("./cleaning-company/cleaning-company.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user-role/user.module");
const rating_module_1 = require("./rating/rating.module");
const client_module_1 = require("./client/client.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'poiuytrewq123.com',
                database: 'cleaning_db',
                autoLoadEntities: true,
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            search_module_1.SearchModule,
            to_book_module_1.ToBookModule,
            history_clean_module_1.HistoryCleanModule,
            rating_module_1.RatingModule,
            order_module_1.OrderModule,
            email_sms_module_1.EmailSmsModule,
            cleaning_company_module_1.CleaningCompanyModule,
            client_module_1.ClientModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map