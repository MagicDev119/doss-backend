import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurants } from 'src/typeorm';
import { Offers } from 'src/typeorm';
import { UsersOffers } from 'src/typeorm';
export declare class RestaurantsService {
    private readonly restaurantsRepository;
    private readonly offersRepository;
    private readonly usersOffersRepository;
    private usersService;
    constructor(restaurantsRepository: Repository<Restaurants>, offersRepository: Repository<Offers>, usersOffersRepository: Repository<UsersOffers>, usersService: UsersService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<{
        status: number;
        data: Restaurants;
        message: string;
    }>;
    findAll(userId?: any): Promise<{
        status: number;
        data: any[];
        message: string;
    }>;
    findOne(id: number): string;
    findByRestaurantId(restaurantId: number): Promise<Restaurants[]>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): string;
    remove(id: number): string;
    activate(restaurantId: number, userId: number): Promise<{
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
