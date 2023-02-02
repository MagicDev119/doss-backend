"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_code_seed_service_1 = require("./services/coupon-code-seed.service");
const typeorm_2 = require("../../../typeorm");
const typeorm_3 = require("../../../typeorm");
const typeorm_4 = require("../../../typeorm");
const typeorm_5 = require("../../../typeorm");
let SeedModule = class SeedModule {
};
SeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_3.Restaurants, typeorm_2.Referrals, typeorm_4.Events, typeorm_5.Plans]),
            schedule_1.ScheduleModule.forRoot(),
        ],
        providers: [
            coupon_code_seed_service_1.default
        ],
    })
], SeedModule);
exports.default = SeedModule;
;
//# sourceMappingURL=seed.module.js.map