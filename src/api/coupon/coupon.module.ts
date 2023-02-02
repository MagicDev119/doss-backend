import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
// import CouponSchema from './model/coupon.schema';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referrals } from 'src/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Referrals]),
    UsersModule
  ],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
