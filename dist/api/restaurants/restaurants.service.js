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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_3 = require("../../typeorm");
const typeorm_4 = require("../../typeorm");
const typeorm_5 = require("../../typeorm");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantsRepository, offersRepository, usersOffersRepository, usersService) {
        this.restaurantsRepository = restaurantsRepository;
        this.offersRepository = offersRepository;
        this.usersOffersRepository = usersOffersRepository;
        this.usersService = usersService;
    }
    async create(createRestaurantDto) {
        const newRestaurant = this.restaurantsRepository.create({
            name: createRestaurantDto.name,
            description: createRestaurantDto.description,
            image_path: createRestaurantDto.image
        });
        await this.offersRepository.save(newRestaurant);
        const newOffer = this.offersRepository.create({
            title: createRestaurantDto.offer,
            restaurant: newRestaurant
        });
        await this.offersRepository.save(newOffer);
        return { status: 1, data: newRestaurant, message: 'success' };
    }
    async findAll(userId = null) {
        const allRestaurants = await this.restaurantsRepository.find();
        let temp = [];
        for (let r of allRestaurants) {
            const offers = await this.usersOffersRepository.find({
                relations: ['offer', 'user', 'offer.restaurant'],
                where: {
                    offer: {
                        restaurant: {
                            id: r.id
                        }
                    },
                    user: {
                        id: userId
                    }
                }
            });
            const t = {
                id: r.id,
                image: r.image_path,
                name: r.name,
                description: r.description,
                available: r.is_enabled,
                createdAt: r.created_at,
                expireDate: r.created_at,
                offer: offers.length ? offers[0].offer.title : "",
                offerId: offers.length ? offers[0].offer.id : null,
                status: offers.length ? 1 : 0,
            };
            temp.push(t);
        }
        return {
            status: 1,
            data: temp,
            message: 'success'
        };
    }
    findOne(id) {
        return `This action returns a #${id} restaurant`;
    }
    async findByRestaurantId(restaurantId) {
        const restaurant = await this.restaurantsRepository.findBy({ id: restaurantId });
        if (!restaurant)
            throw new common_1.BadRequestException('Offer Not found');
        return restaurant;
    }
    update(id, updateRestaurantDto) {
        return `This action updates a #${id} restaurant`;
    }
    remove(id) {
        return `This action removes a #${id} restaurant`;
    }
    async activate(restaurantId, userId) {
        const restaurant = await this.findByRestaurantId(restaurantId);
        const user = await this.usersService.findByUserId(userId);
        const restaurantOffer = this.offersRepository.create({
            title: "",
            restaurant: restaurant[0]
        });
        await this.offersRepository.save(restaurantOffer);
        const newUserOffer = this.usersOffersRepository.create({
            offer: restaurantOffer,
            user: user
        });
        await this.usersOffersRepository.save(newUserOffer);
        return {
            status: 1,
            data: {
                id: restaurant[0].id,
                image: restaurant[0].image_path,
                name: restaurant[0].name,
                description: restaurant[0].description,
                available: restaurant[0].is_enabled,
                createdAt: restaurant[0].created_at,
                expireDate: restaurantOffer.start_at,
                offer: "",
                offerId: restaurantOffer.id,
                status: 1
            },
            message: 'activated offer'
        };
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.Restaurants)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_4.Offers)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_5.UsersOffers)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map