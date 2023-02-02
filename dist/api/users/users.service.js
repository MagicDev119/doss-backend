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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("../../typeorm");
const typeorm_3 = require("../../typeorm");
const typeorm_4 = require("../../typeorm");
const typeorm_5 = require("../../typeorm");
const typeorm_6 = require("../../typeorm");
const typeorm_7 = require("../../typeorm");
const typeorm_8 = require("typeorm");
const utils_1 = require("../shared/utils/utils");
const stripe_service_1 = require("../shared/services/stripe.service");
const class_validator_1 = require("class-validator");
let UsersService = class UsersService {
    constructor(userRepository, profilesRepository, plansRepository, usersPlansRepository, referralsRepository, stripeRepository, stripeService) {
        this.userRepository = userRepository;
        this.profilesRepository = profilesRepository;
        this.plansRepository = plansRepository;
        this.usersPlansRepository = usersPlansRepository;
        this.referralsRepository = referralsRepository;
        this.stripeRepository = stripeRepository;
        this.stripeService = stripeService;
    }
    async create(userDTO) {
        const { email } = userDTO;
        const validationResult = (0, utils_1.validateEmail)(email);
        if (!validationResult) {
            throw new common_1.HttpException("Email format is incorrect", common_1.HttpStatus.BAD_REQUEST);
        }
        let userAlreadyExists = false;
        let errorCode = -2;
        if (!userAlreadyExists) {
            const user = await this.userRepository.findOneBy({ email });
            userAlreadyExists = !!user;
            errorCode = -4;
        }
        if (!userAlreadyExists) {
            const user = await this.findByPhone(userDTO.phoneNumber);
            userAlreadyExists = !!user;
            errorCode = -5;
        }
        if (userAlreadyExists) {
            return { status: errorCode, error: 'user already exists' };
        }
        common_1.Logger.log(userDTO);
        const newProfile = this.profilesRepository.create({
            name: userDTO.fullName
        });
        await this.profilesRepository.save(newProfile);
        const newReferrals = await this.referralsRepository.findBy({
            code: userDTO.invitationCode
        });
        const newPlans = await this.plansRepository.findBy({
            title: userDTO.subscriptionPlan
        });
        const newUsersPlans = this.usersPlansRepository.create({
            plan: newPlans[0]
        });
        await this.usersPlansRepository.save(newUsersPlans);
        const newUsersStripe = this.stripeRepository.create({
            customer_id: userDTO.stripeCustomerId,
            subscriptionId: userDTO.stripeSubscriptionId
        });
        await this.stripeRepository.save(newUsersStripe);
        const newUser = this.userRepository.create({
            email: userDTO.email,
            phone_number: userDTO.phoneNumber,
        });
        newUser.profile = newProfile;
        newUser.referral = newReferrals[0];
        newUser.userPlans = [newUsersPlans];
        newUser.stripes = [newUsersStripe];
        const errors = await (0, class_validator_1.validate)(newUser);
        if (errors.length > 0) {
            throw new Error(`Validation failed!`);
        }
        else {
            await this.userRepository.save(newUser);
        }
        return newUser;
    }
    async findOne(email) {
        return this.userRepository.findOneBy({ email: email });
    }
    async findByPhone(phoneNumber) {
        const user = await this.userRepository.findOne({
            where: {
                phone_number: phoneNumber,
            },
            relations: ["profile", "stripes", "userPlans", "userPlans.plan"]
        });
        return user;
    }
    async findByUserId(id) {
        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
            relations: ["profile", "stripes", "userPlans"]
        });
        if (!user)
            throw new common_1.BadRequestException('User Not found');
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user)
            throw new common_1.BadRequestException('User Not found');
        return user;
    }
    async findAll() {
        return this.userRepository.find();
    }
    async update(userId, updateUserDto) {
        return this.userRepository
            .save({ id: userId, email: updateUserDto.email, login_otp: updateUserDto.login_otp });
    }
    async setRefreshToken(refreshToken, userId) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        return this.userRepository
            .save({ id: userId,
            refreshToken: hashedRefreshToken
        });
    }
    async markEmailAsConfirmed(email) {
        const userToUpdate = await this.userRepository.findOneBy({ email });
        userToUpdate.is_email_verified = true;
        return this.userRepository.save(userToUpdate);
    }
    async createCustomer(_customer) {
        let userAlreadyExists = false;
        let errorCode = -2;
        if (!userAlreadyExists) {
            const user = await this.userRepository.findOneBy({ email: _customer.email });
            userAlreadyExists = !!user;
            errorCode = -4;
        }
        if (!userAlreadyExists) {
            console.log(_customer.phoneNumber);
            const user = await this.findByPhone(_customer.phoneNumber);
            userAlreadyExists = !!user;
            errorCode = -5;
        }
        if (userAlreadyExists) {
            return { status: errorCode, error: 'user already exists' };
        }
        const { customer, prices } = await this.stripeService.createCustomer(_customer.name, _customer.email);
        return { status: 1, customer, prices };
    }
    async createSubscription(subscriptionDto) {
        return this.stripeService.createSubscription(subscriptionDto);
    }
    async createCustomerPortal(customerPortalDto, userId) {
        const user = await this.findByUserId(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return this.stripeService.createCustomerPortal(customerPortalDto);
    }
    async getSubscriptionDetail(userId) {
        var _a, _b;
        const user = await this.findByUserId(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return this.stripeService.getSubscriptionDetail((_a = user.stripes[0]) === null || _a === void 0 ? void 0 : _a.customer_id, (_b = user.stripes[0]) === null || _b === void 0 ? void 0 : _b.subscriptionId);
    }
    async renewSubscription(userId) {
        var _a, _b;
        const user = await this.findByUserId(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        return this.stripeService.renewSubscription((_a = user.stripes[0]) === null || _a === void 0 ? void 0 : _a.customer_id, (_b = user.stripes[0]) === null || _b === void 0 ? void 0 : _b.subscriptionId);
    }
    async getPriceList() {
        return this.stripeService.priceList();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.Profiles)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_5.Plans)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_4.UsersPlans)),
    __param(4, (0, typeorm_1.InjectRepository)(typeorm_6.Referrals)),
    __param(5, (0, typeorm_1.InjectRepository)(typeorm_7.Stripe)),
    __metadata("design:paramtypes", [typeorm_8.Repository,
        typeorm_8.Repository,
        typeorm_8.Repository,
        typeorm_8.Repository,
        typeorm_8.Repository,
        typeorm_8.Repository,
        stripe_service_1.default])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map