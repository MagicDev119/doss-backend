import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Offers } from "./offers.entity";
import { Events } from "./events.entity";

@Entity()
export class Restaurants {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text'
  })
  name: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true
  })
  address: string;

  @Column({
    type: 'text',
    nullable: true
  })
  image_path: string;

  @Column({
    type: 'boolean',
    nullable: true
  })
  is_enabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @OneToMany(type => Offers, offer => offer.restaurant)
  offers: Offers[];

  @OneToMany(type => Events, event => event.restaurant)
  events: Events[];
}