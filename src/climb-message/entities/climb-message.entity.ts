import { ClimbMeetup } from 'src/climb-meetup/entities/climb-meetup.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ClimbMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  message: string;

  @Column({
    default: false,
  })
  read: boolean;

  @ManyToOne(() => ClimbMeetup, (climbMeetup) => climbMeetup.messages)
  climbMeetup: ClimbMeetup;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
