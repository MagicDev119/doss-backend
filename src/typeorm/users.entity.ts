import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Referrals } from "./referrals.entity";
import { UsersPlans } from "./users_plans.entity";
import { Friends } from "./friends.entity";
import { UsersOffers } from "./users_offers.entity";
import { UsersEvents } from "./users_events.entity";
import { Stripe } from "./stripe.entity";
import { Profiles } from "./profiles.entity";
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsBoolean,
  IsDate,
  Min,
  Max,
} from "class-validator"
export type RegisterSteps = -1 | 1 | 2

@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;
  
  @Column({
    nullable: false,
    default: '',
    type: 'text'
  })
  email: string;

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  login_otp: string;

  @Column({
    type: 'varchar'
  })
  phone_number: string;

  @Column({
    type: 'boolean',
    nullable: true
  })
  // @IsBoolean()
  is_enabled: boolean;

  @Column({
    type: 'boolean',
    nullable: true
  })
  // @IsBoolean()
  is_phone_verified: boolean;

  @Column({
    type: 'boolean',
    nullable: true
  })
  // @IsBoolean()
  is_email_verified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Column({
    type: "enum",
    enum: [-1, 1, 2],
    default: -1
  })
  register_step: RegisterSteps

  @Column({
    type: 'boolean',
    nullable: true
  })
  // @IsBoolean()
  is_pending_renew: boolean;

  @Column({
    type: 'text',
    nullable: true
  })
  verificationCode: string;

  @Column({
    type: 'text',
    nullable: true
  })
  refreshToken: string;

  @ManyToOne(type => Referrals, referral => referral.users)
  referral: Referrals;

  @OneToMany(type => UsersPlans, userplans => userplans.user)
  userPlans: UsersPlans[]; 

  @OneToMany(type => Friends, friend => friend.friend)
  friends: Friends[];

  @OneToMany(type => UsersOffers, useroffers => useroffers.user)
  userOffers: UsersOffers[];

  @OneToMany(type => UsersEvents, userEvents => userEvents.user)
  userEvents: UsersEvents[];

  @OneToMany(type => Stripe, stripe => stripe.user)
  stripes: Stripe[];

  @OneToOne(type => Profiles) @JoinColumn() 
  profile: Profiles;
}
