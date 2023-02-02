import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from  './users.service';
import { SharedModule } from '../shared/shared.module';
import { Users } from 'src/typeorm';
import { Profiles } from 'src/typeorm';
import { Plans } from 'src/typeorm';
import { UsersPlans } from 'src/typeorm';
import { Referrals } from 'src/typeorm';
import { Stripe } from 'src/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, Profiles, Plans, UsersPlans, Referrals, Stripe]),
        SharedModule
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
