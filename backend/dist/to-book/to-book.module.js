"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBookModule = void 0;
const common_1 = require("@nestjs/common");
const to_book_service_1 = require("./to-book.service");
const to_book_controller_1 = require("./to-book.controller");
const typeorm_1 = require("@nestjs/typeorm");
const to_book_entity_1 = require("./entities/to-book.entity");
let ToBookModule = class ToBookModule {
};
exports.ToBookModule = ToBookModule;
exports.ToBookModule = ToBookModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([to_book_entity_1.ToBookEntity])],
        controllers: [to_book_controller_1.ToBookController],
        providers: [to_book_service_1.ToBookService],
        exports: [to_book_service_1.ToBookService]
    })
], ToBookModule);
//# sourceMappingURL=to-book.module.js.map