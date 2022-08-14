import { ClimbMessage } from 'src/climb-message/entities/climb-message.entity';
import { ClimbRequest } from 'src/climb-request/entities/climb-request.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class ClimbMeetup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  climbDate: Date;

  @OneToOne(() => ClimbRequest, (climbRequest) => climbRequest.climbMeetup)
  @JoinColumn()
  climbRequest: ClimbRequest;

  @OneToMany(() => ClimbMessage, (climbMessage) => climbMessage.climbMeetup)
  messages: ClimbMessage[];

  @ManyToMany(() => User, (user) => user.climbMeetups)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
