import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Users } from "./users.entity";
import { Plans } from "./plans.entity";

@Entity()
export class UsersPlans {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @CreateDateColumn({ name: 'started_at' })
  started_at: Date;

  @CreateDateColumn({ name: 'canceled_at' })
  canceled_at: Date;

  @Column({
    type: 'boolean',
    nullable: true
  })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToOne(type => Users, user => user.userPlans)
  user: Users;

  @ManyToOne(type => Plans, plan => plan.userPlans)
  plan: Plans;
}