import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from "./users.entity";
import { Events } from "./events.entity";

@Entity()
export class UsersEvents {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'boolean'
  })
  is_attending: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToOne(type => Users, user => user.userEvents)
  user: Users;

  @ManyToOne(type => Events, event => event.userEvents)
  event: Events;
}