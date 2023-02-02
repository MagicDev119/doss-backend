"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CouponCodeSeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const coupon_seeds_1 = require("../data/coupon-seeds");
const plan_seeds_1 = require("../data/plan-seeds");
const event_seeds_1 = require("../data/event-seeds");
const restaurant_seeds_1 = require("../data/restaurant-seeds");
const typeorm_4 = require("../../../../typeorm");
const typeorm_5 = require("../../../../typeorm");
const typeorm_6 = require("../../../../typeorm");
const typeorm_7 = require("../../../../typeorm");
let CouponCodeSeedService = CouponCodeSeedService_1 = class CouponCodeSeedService {
    constructor(referralRepository, restaurantRepository, eventRepository, plansRepository) {
        this.referralRepository = referralRepository;
        this.restaurantRepository = restaurantRepository;
        this.eventRepository = eventRepository;
        this.plansRepository = plansRepository;
        this.logger = new common_1.Logger(CouponCodeSeedService_1.name);
    }
    onModuleInit() {
        if (process.env.POSTGRE_SEED_DB && process.env.POSTGRE_SEED_DB === "true") {
            this.logger.warn(`Seed module (${CouponCodeSeedService_1.name}) has been initialized and updates collections (flag: ${process.env.POSTGRE_SEED_DB})`);
            this.seedData();
        }
        else {
            this.logger.warn(`Seed module is disabled, seed scripts didn't run.`);
        }
    }
    seedData() {
        this.seedCouponData();
    }
    seedCouponData() {
        coupon_seeds_1.couponSeedData.forEach(async (f) => {
            console.log(f);
            const userToUpdate = await this.referralRepository.findOneBy({ code: f.code });
            if (userToUpdate) {
                userToUpdate.code = f.code;
                await this.referralRepository.save(userToUpdate);
            }
            else {
                const newCoupon = this.referralRepository.create(f);
                await this.referralRepository.save(newCoupon);
            }
            this.logger.debug(`Collection coupon successfully seeded`);
        });
        restaurant_seeds_1.restaurantSeedData.forEach(async (f) => {
            console.log(f);
            let restaurantToUpdate = await this.restaurantRepository.findOneBy({ name: f.name });
            if (restaurantToUpdate) {
                restaurantToUpdate = Object.assign(Object.assign({}, restaurantToUpdate), f);
                await this.restaurantRepository.save(restaurantToUpdate);
            }
            else {
                const newCoupon = this.restaurantRepository.create(f);
                await this.restaurantRepository.save(newCoupon);
            }
            this.logger.debug(`Collection coupon successfully seeded`);
        });
        event_seeds_1.eventSeedData.forEach(async (f) => {
            console.log(f);
            let eventToUpdate = await this.eventRepository.findOneBy({ title: f.title });
            if (eventToUpdate) {
                const restaurants = await this.restaurantRepository.findBy({ id: (0, typeorm_3.In)([f.restaurantId]) });
                eventToUpdate = Object.assign(Object.assign({}, eventToUpdate), f);
                eventToUpdate.restaurant = restaurants[0];
                await this.eventRepository.save(eventToUpdate);
            }
            else {
                const newCoupon = this.eventRepository.create(f);
                await this.eventRepository.save(newCoupon);
            }
            this.logger.debug(`Collection coupon successfully seeded`);
        });
        plan_seeds_1.planSeedData.forEach(async (f) => {
            console.log(f);
            const planToUpdate = await this.plansRepository.findOneBy({ recurrence: f.recurrence });
            if (planToUpdate) {
                planToUpdate.recurrence = f.recurrence;
                await this.plansRepository.save(planToUpdate);
            }
            else {
                const newCoupon = this.plansRepository.create(Object.assign(Object.assign({}, f), { recurrence: f.recurrence }));
                await this.plansRepository.save(newCoupon);
            }
            this.logger.debug(`Collection coupon successfully seeded`);
        });
        console.log('seed updated');
    }
};
CouponCodeSeedService = CouponCodeSeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_4.Referrals)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_5.Restaurants)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_6.Events)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_7.Plans)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CouponCodeSeedService);
exports.default = CouponCodeSeedService;
//# sourceMappingURL=coupon-code-seed.service.js.map