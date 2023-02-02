import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from "./users.entity";

@Entity()
export class Stripe {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text'
  })
  customer_id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  subscriptionId: string;

  @ManyToOne(type => Users, user => user.stripes)
  user: Users;
}