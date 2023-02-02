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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("../../typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
let CouponService = class CouponService {
    constructor(referralsRepository, usersService) {
        this.referralsRepository = referralsRepository;
        this.usersService = usersService;
    }
    create(createCouponDto) {
        return 'This action adds a new coupon';
    }
    findAll() {
        return `This action returns all coupon`;
    }
    async findOne(id) {
        return `This action returns a #${id} coupon`;
    }
    async findOneByCode(customer) {
        const coupon = await this.referralsRepository.findOneBy({ code: customer.code });
        if (!coupon) {
            return { status: -3, error: 'Invalid coupon' };
        }
        return this.usersService.createCustomer(customer);
    }
    update(id, updateCouponDto) {
        return `This action updates a #${id} coupon`;
    }
    remove(id) {
        return `This action removes a #${id} coupon`;
    }
};
CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(typeorm_1.Referrals)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        users_service_1.UsersService])
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=coupon.service.js.map