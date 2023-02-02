import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Restaurants } from "./restaurants.entity";
import { UsersOffers } from "./users_offers.entity";

@Entity()
export class Offers {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text',
    nullable: true
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true
  })
  image_path: string;

  @CreateDateColumn({ name: 'start_at' })
  start_at: Date;

  @CreateDateColumn({ name: 'end_at' })
  end_at: Date;

  @Column({
    type: 'boolean',
    nullable: true
  })
  is_enabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToOne(type => Restaurants, restaurant => restaurant.offers)
  restaurant: Restaurants;

  @OneToMany(type => UsersOffers, userOffers => userOffers.offer)
  userOffers: UsersOffers[];
}