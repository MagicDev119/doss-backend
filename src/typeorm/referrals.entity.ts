import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Users } from "./users.entity";

@Entity()
export class Referrals {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text'
  })
  code: string;

  @OneToMany(type => Users, user => user.referral)
  users: Users[];  

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Column({
    type: 'boolean',
    nullable: true
  })
  is_enabled: boolean;
}