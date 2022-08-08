import { ClimbRequest } from 'src/climb-request/entities/climb-request.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class ClimbAvailabilityScheduled {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDateTime: Date;

  @Column()
  endDateTime: Date;

  @Column()
  areas: string;

  @ManyToOne(() => User, (user) => user.climbAvailabilityScheduled)
  initialUser: User;

  @OneToMany(() => ClimbRequest, (climbRequest) => climbRequest.initiatingEntry)
  climbRequests: ClimbRequest[];

  @OneToMany(
    () => ClimbRequest,
    (climbRequest) => climbRequest.targetScheduledRequest,
  )
  incomingClimbRequests: ClimbRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
