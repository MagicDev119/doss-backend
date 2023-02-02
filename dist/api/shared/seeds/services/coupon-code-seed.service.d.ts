import { OnModuleInit } from "@nestjs/common";
import { Repository } from 'typeorm';
import { Referrals } from 'src/typeorm';
import { Restaurants } from 'src/typeorm';
import { Events } from 'src/typeorm';
import { Plans } from 'src/typeorm';
export default class CouponCodeSeedService implements OnModuleInit {
    private readonly referralRepository;
    private readonly restaurantRepository;
    private readonly eventRepository;
    private readonly plansRepository;
    constructor(referralRepository: Repository<Referrals>, restaurantRepository: Repository<Restaurants>, eventRepository: Repository<Events>, plansRepository: Repository<Plans>);
    private readonly logger;
    onModuleInit(): void;
    seedData(): void;
    seedCouponData(): void;
}
