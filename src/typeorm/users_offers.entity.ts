import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from "./users.entity";
import { Offers } from "./offers.entity";

@Entity()
export class UsersOffers {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @CreateDateColumn({ name: 'activated_at' })
  activated_at: Date;

  @Column({
    type: 'boolean',
    nullable: true
  })
  is_active: boolean;
  
  @ManyToOne(type => Offers, offer => offer.userOffers)
  offer: Offers;

  @ManyToOne(type => Users, user => user.userOffers)
  user: Users;
}