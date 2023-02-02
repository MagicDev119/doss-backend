import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Users } from "./users.entity";

@Entity()
export class Friends {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @ManyToOne(type => Users, user => user.friends)
  friend: Users;
  
  @OneToOne(type => Users) @JoinColumn() 
  user: Users;
}