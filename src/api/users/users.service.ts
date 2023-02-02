import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  InternalServerErrorException,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
// import { User } from '../shared/types/user';
import { Users } from 'src/typeorm';
import { Profiles } from 'src/typeorm';
import { UsersPlans } from 'src/typeorm';
import { Plans } from 'src/typeorm';
import { Referrals } from 'src/typeorm';
import { Stripe } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto, CustomerPortalDto, UserDTO, UserSignupDTO } from './dto/create-user.dto';
import { CredentialsDTO } from '../auth/dto/auth.dto';
import { validateEmail } from '../shared/utils/utils';
import StripeService from '../shared/services/stripe.service';
import { validate } from "class-validator"

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Profiles) private readonly profilesRepository: Repository<Profiles>,
    @InjectRepository(Plans) private readonly plansRepository: Repository<Plans>,
    @InjectRepository(UsersPlans) private readonly usersPlansRepository: Repository<UsersPlans>,
    @InjectRepository(Referrals) private readonly referralsRepository: Repository<Referrals>,
    @InjectRepository(Stripe) private readonly stripeRepository: Repository<Stripe>,
    // @InjectModel('User') private userModel: Model<User>,
    private stripeService: StripeService
    // @Inject(forwardRef(() => EmailConfirmationService)) private emailConfirmationService: EmailConfirmationService
  ) {

  }

  async create(userDTO: UserSignupDTO): Promise<any> {
    const { email } = userDTO;
    const validationResult = validateEmail(email);
    if (!validationResult) {
      throw new HttpException("Email format is incorrect", HttpStatus.BAD_REQUEST);
    }
    let userAlreadyExists: boolean = false;
    let errorCode = -2;
    if (!userAlreadyExists) {
      const user = await this.userRepository.findOneBy({ email });
      userAlreadyExists = !!user;
      errorCode = -4;
    }
    if (!userAlreadyExists) {
      const user = await this.findByPhone(userDTO.phoneNumber);
      userAlreadyExists = !!user;
      errorCode = -5;
    }
    if (userAlreadyExists) {
      // const user = userMatch[0];
      // // if (user.emailVerified)
      // throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      // // else {
      // //     return this.emailConfirmationService.sendVerificationLink(user.email)
      // // }
      return { status: errorCode, error: 'user already exists' };
    }
    // eslint-disable-next-line new-cap
    Logger.log(userDTO);

    const newProfile = this.profilesRepository.create({
      name: userDTO.fullName
    });

    await this.profilesRepository.save(newProfile);

    const newReferrals = await this.referralsRepository.findBy({
      code: userDTO.invitationCode
    });

    const newPlans = await this.plansRepository.findBy({
      title: userDTO.subscriptionPlan
    });
    const newUsersPlans = this.usersPlansRepository.create({
      plan: newPlans[0]
    });

    await this.usersPlansRepository.save(newUsersPlans);

    const newUsersStripe = this.stripeRepository.create({
      customer_id: userDTO.stripeCustomerId,
      subscriptionId: userDTO.stripeSubscriptionId
    });

    await this.stripeRepository.save(newUsersStripe);

    const newUser = this.userRepository.create({
      email: userDTO.email,
      // login_otp: ,
      phone_number: userDTO.phoneNumber,
      // is_enabled: ,
      // is_phone_verified: ,
      // is_email_verified: ,
      // register_step: ,
      // is_pending_renew: ,
    });
    newUser.profile = newProfile;
    newUser.referral = newReferrals[0];
    newUser.userPlans = [newUsersPlans];
    newUser.stripes = [newUsersStripe];
    const errors = await validate(newUser)
    if (errors.length > 0) {
      throw new Error(`Validation failed!`)
    } else {
      await this.userRepository.save(newUser);
    }
    // try {
    //   await newUser.validate();
    // } catch (e) {
    //   throw new UnprocessableEntityException(e); // HTTP 422
    // }
    // try {
    //   await newUser.save();
    // } catch (e) {
    //   throw new InternalServerErrorException(e);
    // }

    return newUser;
  }

  async findOne(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async findByPhone(phoneNumber: string) {
    const user = await this.userRepository.findOne({ 
      where: {
        phone_number: phoneNumber,
      },
      relations: ["profile", "stripes", "userPlans", "userPlans.plan"]
    });
    return user;
  }
  async findByUserId(id: number) {
    const user = await this.userRepository.findOne({ 
      where: {
        id: id,
      },
      relations: ["profile", "stripes", "userPlans"]
    });
    if (!user) throw new BadRequestException('User Not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new BadRequestException('User Not found');
    return user;
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async update(userId: number, updateUserDto: any): Promise<Users> {
    return this.userRepository
    .save({id: userId, email: updateUserDto.email, login_otp: updateUserDto.login_otp});
  }

  async setRefreshToken(refreshToken: string, userId: number) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.userRepository
    .save({id: userId, 
      refreshToken: hashedRefreshToken
    });
  }

  async markEmailAsConfirmed(email: string) {
    const userToUpdate = await this.userRepository.findOneBy({ email })
    userToUpdate.is_email_verified = true
    return this.userRepository.save(userToUpdate)
  }

  async createCustomer(_customer: CreateCustomerDto) {
    let userAlreadyExists: boolean = false;
    let errorCode = -2;
    if (!userAlreadyExists) {
      const user = await this.userRepository.findOneBy({ email: _customer.email });
      userAlreadyExists = !!user;
      errorCode = -4;
    }
    if (!userAlreadyExists) {
      console.log(_customer.phoneNumber);
      const user = await this.findByPhone(_customer.phoneNumber);
      userAlreadyExists = !!user;
      errorCode = -5;
    }
    if (userAlreadyExists) {
      // const user = userMatch[0];
      // // if (user.emailVerified)
      // throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      // // else {
      // //     return this.emailConfirmationService.sendVerificationLink(user.email)
      // // }
      return { status: errorCode, error: 'user already exists' };
    }
    const { customer, prices } = await this.stripeService.createCustomer(_customer.name, _customer.email);
    return { status: 1, customer, prices };
  }

  async createSubscription(subscriptionDto: any) {
    return this.stripeService.createSubscription(subscriptionDto);
  }

  async createCustomerPortal(customerPortalDto: CustomerPortalDto, userId: number) {
    const user = await this.findByUserId(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.stripeService.createCustomerPortal(customerPortalDto);
  }

  async getSubscriptionDetail(userId: number) {
    const user = await this.findByUserId(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.stripeService.getSubscriptionDetail(user.stripes[0]?.customer_id, user.stripes[0]?.subscriptionId);
  }

  async renewSubscription(userId: number) {
    const user = await this.findByUserId(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.stripeService.renewSubscription(user.stripes[0]?.customer_id, user.stripes[0]?.subscriptionId);
  }

  async getPriceList() {
    return this.stripeService.priceList();
  }
}