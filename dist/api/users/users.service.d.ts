import { Users } from 'src/typeorm';
import { Profiles } from 'src/typeorm';
import { UsersPlans } from 'src/typeorm';
import { Plans } from 'src/typeorm';
import { Referrals } from 'src/typeorm';
import { Stripe } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto, CustomerPortalDto, UserSignupDTO } from './dto/create-user.dto';
import StripeService from '../shared/services/stripe.service';
export declare class UsersService {
    private readonly userRepository;
    private readonly profilesRepository;
    private readonly plansRepository;
    private readonly usersPlansRepository;
    private readonly referralsRepository;
    private readonly stripeRepository;
    private stripeService;
    constructor(userRepository: Repository<Users>, profilesRepository: Repository<Profiles>, plansRepository: Repository<Plans>, usersPlansRepository: Repository<UsersPlans>, referralsRepository: Repository<Referrals>, stripeRepository: Repository<Stripe>, stripeService: StripeService);
    create(userDTO: UserSignupDTO): Promise<any>;
    findOne(email: string): Promise<Users>;
    findByPhone(phoneNumber: string): Promise<Users>;
    findByUserId(id: number): Promise<Users>;
    findByEmail(email: string): Promise<Users>;
    findAll(): Promise<Users[]>;
    update(userId: number, updateUserDto: any): Promise<Users>;
    setRefreshToken(refreshToken: string, userId: number): Promise<{
        id: number;
        refreshToken: string;
    } & Users>;
    markEmailAsConfirmed(email: string): Promise<Users>;
    createCustomer(_customer: CreateCustomerDto): Promise<{
        status: number;
        error: string;
        customer?: undefined;
        prices?: undefined;
    } | {
        status: number;
        customer: import("stripe").Stripe.Response<import("stripe").Stripe.Customer>;
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
        error?: undefined;
    }>;
    createSubscription(subscriptionDto: any): Promise<{
        subscriptionId: string;
        invoiceData: string | import("stripe").Stripe.Invoice;
        status?: undefined;
        message?: undefined;
    } | {
        status: number;
        message: string;
        subscriptionId?: undefined;
        invoiceData?: undefined;
    }>;
    createCustomerPortal(customerPortalDto: CustomerPortalDto, userId: number): Promise<{
        session: import("stripe").Stripe.Response<import("stripe").Stripe.BillingPortal.Session>;
    }>;
    getSubscriptionDetail(userId: number): Promise<{
        status: number;
        data: import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>;
        message: string;
    } | {
        status: number;
        message: string;
        data?: undefined;
    }>;
    renewSubscription(userId: number): Promise<{
        status: number;
        message: string;
        data: import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>;
    }>;
    getPriceList(): Promise<{
        prices: import("stripe").Stripe.Response<import("stripe").Stripe.ApiList<import("stripe").Stripe.Price>>;
    }>;
}
