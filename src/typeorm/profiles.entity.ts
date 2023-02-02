import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from "./users.entity";
export type ProfileTypes = 'user' | 'restaurant_owner'

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text'
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true
  })
  picture: string;

  @Column({
    type: "enum",
    enum: ['user', 'restaurant_owner'],
    default: 'user'
  })
  type: ProfileTypes

  @Column({
    type: 'boolean',
    nullable: true
  })
  is_enabled_referral_payments: boolean;

  @Column({ type: 'decimal', precision: 7, scale: 3, default: 0.0 })
  rate_referral_payments: string;

}