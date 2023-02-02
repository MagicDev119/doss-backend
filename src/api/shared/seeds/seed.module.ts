import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from '@nestjs/typeorm';
import CouponCodeSeedService from "./services/coupon-code-seed.service";
import { Referrals } from 'src/typeorm';
import { Restaurants } from 'src/typeorm';
import { Events } from 'src/typeorm';
import { Plans } from 'src/typeorm';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: "Coupon", schema: CouponSchema },
    //   { name: "Restaurant", schema: RestaurantSchema },
    //   { name: "Event", schema: EventSchema }
    // ]),
    TypeOrmModule.forFeature([Restaurants, Referrals, Events, Plans]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    CouponCodeSeedService
  ],
})

export default class SeedModule { };