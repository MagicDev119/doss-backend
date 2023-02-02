import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Restaurants } from "./restaurants.entity";
import { UsersEvents } from "./users_events.entity";

@Entity()
export class Events {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'name'
  })
  title: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({
    type: 'text',
    name: 'image'
  })
  image_path: string;

  @Column({
    type: 'text',
    nullable: true
  })
  address: string;

  @CreateDateColumn({ name: 'eventDate' })
  start_at: Date;

  @CreateDateColumn({ name: 'createdAt' })
  created_at: Date;

  @ManyToOne(type => Restaurants, restaurant => restaurant.events)
  restaurant: Restaurants;

  @OneToMany(type => UsersEvents, userEvents => userEvents.event)
  userEvents: UsersEvents[];
}