"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatedModule = void 0;
const common_1 = require("@nestjs/common");
const rated_service_1 = require("./rated.service");
const rated_controller_1 = require("./rated.controller");
let RatedModule = class RatedModule {
};
exports.RatedModule = RatedModule;
exports.RatedModule = RatedModule = __decorate([
    (0, common_1.Module)({
        controllers: [rated_controller_1.RatedController],
        providers: [rated_service_1.RatedService],
        exports: [rated_service_1.RatedService],
    })
], RatedModule);
//# sourceMappingURL=rated.module.js.map