/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { UserOffer } from '../shared/types/offer';
import { Restaurant } from '../shared/types/restaurant';
import { UsersService } from '../users/users.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsService {
    private restaurantModel;
    private offerModel;
    private usersService;
    constructor(restaurantModel: Model<Restaurant>, offerModel: Model<UserOffer>, usersService: UsersService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<{
        status: number;
        data: Restaurant & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    findAll(userId?: any): Promise<{
        status: number;
        data: any[];
        message: string;
    }>;
    findOne(id: number): string;
    findByRestaurantId(restaurantId: string): Promise<Restaurant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): string;
    remove(id: number): string;
    activate(restaurantId: string, userId: string): Promise<{
        status: number;
        data: {
            offerId: any;
            status: number;
        };
        message: string;
    }>;
}