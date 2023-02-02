import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { Coupon } from "../../types/coupon";
// import { Event } from "../../types/event";
// import { Restaurant } from "../../types/restaurant";
import { couponSeedData } from "../data/coupon-seeds";
import { planSeedData } from "../data/plan-seeds";
import { eventSeedData } from "../data/event-seeds";
import { restaurantSeedData } from "../data/restaurant-seeds";
import { Referrals } from 'src/typeorm';
import { Restaurants } from 'src/typeorm';
import { Events } from 'src/typeorm';
import { Plans } from 'src/typeorm';
import { PlanRecurrences } from "src/typeorm/plans.entity";

@Injectable()
export default class CouponCodeSeedService implements OnModuleInit {

  constructor(
    @InjectRepository(Referrals) private readonly referralRepository: Repository<Referrals>,
    @InjectRepository(Restaurants) private readonly restaurantRepository: Repository<Restaurants>,
    @InjectRepository(Events) private readonly eventRepository: Repository<Events>,
    @InjectRepository(Plans) private readonly plansRepository: Repository<Plans>,
  ) { }

  private readonly logger = new Logger(CouponCodeSeedService.name);

  onModuleInit() {
    if (process.env.POSTGRE_SEED_DB && process.env.POSTGRE_SEED_DB === "true") {
      this.logger.warn(
        `Seed module (${CouponCodeSeedService.name}) has been initialized and updates collections (flag: ${process.env.POSTGRE_SEED_DB})`
      );
      this.seedData();
    } else {
      this.logger.warn(`Seed module is disabled, seed scripts didn't run.`);
    }
  }

  seedData() {
    this.seedCouponData();
  }

  seedCouponData() {
    couponSeedData.forEach(async (f) => {
      console.log(f)
      const userToUpdate = await this.referralRepository.findOneBy({ code: f.code })
      if (userToUpdate) {
        userToUpdate.code = f.code
        await this.referralRepository.save(userToUpdate)

      } else {
        const newCoupon = this.referralRepository.create(f);
        await this.referralRepository.save(newCoupon);
      }
      this.logger.debug(`Collection coupon successfully seeded`)

    });

    restaurantSeedData.forEach(async (f) => {
      console.log(f)
      let restaurantToUpdate = await this.restaurantRepository.findOneBy({ name: f.name })
      if (restaurantToUpdate) {
        restaurantToUpdate = { ...restaurantToUpdate, ...f }
        await this.restaurantRepository.save(restaurantToUpdate)

      } else {
        const newCoupon = this.restaurantRepository.create(f);
        await this.restaurantRepository.save(newCoupon);
      }
      this.logger.debug(`Collection coupon successfully seeded`)

    });

    eventSeedData.forEach(async (f) => {
      console.log(f)
      let eventToUpdate = await this.eventRepository.findOneBy({ title: f.title })
      if (eventToUpdate) {
        const restaurants = await this.restaurantRepository.findBy({id: In([f.restaurantId])})
        eventToUpdate = { ...eventToUpdate, ...f }
        eventToUpdate.restaurant = restaurants[0];
        await this.eventRepository.save(eventToUpdate)

      } else {
        const newCoupon = this.eventRepository.create(f);
        await this.eventRepository.save(newCoupon);
      }
      this.logger.debug(`Collection coupon successfully seeded`)

    });
    

    planSeedData.forEach(async (f) => {
      console.log(f)
      const planToUpdate = await this.plansRepository.findOneBy({ recurrence: f.recurrence as PlanRecurrences })
      if (planToUpdate) {
        planToUpdate.recurrence = f.recurrence as PlanRecurrences
        await this.plansRepository.save(planToUpdate)

      } else {
        const newCoupon = this.plansRepository.create({...f, recurrence: f.recurrence as PlanRecurrences});
        await this.plansRepository.save(newCoupon);
      }
      this.logger.debug(`Collection coupon successfully seeded`)

    });

    console.log('seed updated');
  }

}