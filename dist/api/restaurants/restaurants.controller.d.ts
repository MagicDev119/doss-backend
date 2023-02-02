import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<{
        status: number;
        data: import("../../typeorm").Restaurants;
        message: string;
    }>;
    findAll(req: any): Promise<{
        status: number;
        data: any[];
        message: string;
    }>;
    findOne(id: string): string;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): string;
    remove(id: string): string;
    activateOffer(id: string, req: any): Promise<{
        status: number;
        data: {
            id: number;
            image: string;
            name: string;
            description: string;
            available: boolean;
            createdAt: Date;
            expireDate: Date;
            offer: string;
            offerId: number;
            status: number;
        };
        message: string;
    }>;
}
