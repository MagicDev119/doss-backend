import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { UserOffer } from '../shared/types/offer';
// import { Restaurant } from '../shared/types/restaurant';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ActivateOfferDto } from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
// import { OfferType } from './model/restaurant.schema';
import { Restaurants } from 'src/typeorm';
import { Offers } from 'src/typeorm';
import { UsersOffers } from 'src/typeorm';

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectRepository(Restaurants) private readonly restaurantsRepository: Repository<Restaurants>,
    @InjectRepository(Offers) private readonly offersRepository: Repository<Offers>,
    @InjectRepository(UsersOffers) private readonly usersOffersRepository: Repository<UsersOffers>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService
  ) { }
  async create(createRestaurantDto: CreateRestaurantDto) {
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

    return { status: 1, data: newRestaurant, message: 'success' }
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
        offer: offers.length? offers[0].offer.title : "",
        offerId: offers.length ? offers[0].offer.id: null,
        status: offers.length ? 1 : 0,
      };
      temp.push(t);
    }
    return {
      status: 1,
      data: temp,
      message: 'success'
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  async findByRestaurantId(restaurantId: number) {
    const restaurant = await this.restaurantsRepository.findBy({id: restaurantId});
    if (!restaurant) throw new BadRequestException('Offer Not found');
    return restaurant;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }

  async activate(restaurantId: number, userId: number) {
    const restaurant = await this.findByRestaurantId(restaurantId);
    const user = await this.usersService.findByUserId(userId);
    // restaurant.activator = user;
    // restaurant.status = OfferType.ACTIVATED;
    // restaurant.activatedAt = new Date();
    
    // const restaurantOffer = await this.offersRepository.findOne({
    //   relations: ['restaurant'],
    //   where: {
    //     restaurant: {
    //       id: restaurant[0].id
    //     }
    //   }
    // })

    const restaurantOffer = this.offersRepository.create({
      title: "",
      restaurant: restaurant[0]
    })

    await this.offersRepository.save(restaurantOffer);

    const newUserOffer = this.usersOffersRepository.create({
      offer: restaurantOffer,
      user: user
    })

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
    }
  }
}
