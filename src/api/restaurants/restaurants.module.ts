import { Module, forwardRef } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
// import RestaurantSchema from './model/restaurant.schema';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
// import UserOfferSchema from './model/user-offer.schema';
import { Restaurants } from 'src/typeorm';
import { Offers } from 'src/typeorm';
import { UsersOffers } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurants, Offers, UsersOffers]),
    forwardRef(() => UsersModule),
    SharedModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService]
})
export class RestaurantsModule { }
