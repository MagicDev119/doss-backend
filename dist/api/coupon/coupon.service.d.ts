import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Referrals } from 'src/typeorm';
import { UsersService } from '../users/users.service';
import { CreateCustomerDto } from '../users/dto/create-user.dto';
import { Repository } from 'typeorm';
export declare class CouponService {
    private readonly referralsRepository;
    private usersService;
    constructor(referralsRepository: Repository<Referrals>, usersService: UsersService);
    create(createCouponDto: CreateCouponDto): string;
    findAll(): string;
    findOne(id: number): Promise<string>;
    findOneByCode(customer: CreateCustomerDto): Promise<{
        status: number;
        customer: import("stripe").Stripe.Response<import("stripe").Stripe.Customer>;
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
        error?: undefined;
    } | {
        status: number;
        error: string;
    }>;
    update(id: number, updateCouponDto: UpdateCouponDto): string;
    remove(id: number): string;
}
