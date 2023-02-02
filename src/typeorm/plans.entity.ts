import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { UsersPlans } from "./users_plans.entity";
export type PlanRecurrences = 'monthly' | 'yearly'

@Entity()
export class Plans {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text'
  })
  title: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({ type: 'decimal', precision: 9, scale: 3, default: 0.0 })
  price: string;

  @Column({
    type: "enum",
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  })
  recurrence: PlanRecurrences;

  @Column({
    type: 'boolean'
  })
  is_active: boolean;

  @Column({
    type: 'boolean'
  })
  is_offer: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @CreateDateColumn({ name: 'start_at' })
  start_at: Date;

  @CreateDateColumn({ name: 'end_at' })
  end_at: Date;

  @OneToMany(type => UsersPlans, userplans => userplans.plan)
  userPlans: UsersPlans[];
}