import { ClimbAvailabilityGen } from 'src/climb-availability-gen/entities/climb-availability-gen.entity';
import { ClimbAvailabilityScheduled } from 'src/climb-availability-scheduled/entities/climb-availability-scheduled.entity';
import { ClimbMessage } from 'src/climb-message/entities/climb-message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ClimbRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  initialMessage: string;

  @Column({
    nullable: true,
  })
  targetAccepted: boolean;

  @Column({
    nullable: true,
    type: 'text',
  })
  targetMessageResponse: string;

  @ManyToOne(
    () => ClimbAvailabilityScheduled,
    (climbAvailSched) => climbAvailSched.climbRequests,
  )
  initiatingEntry: ClimbAvailabilityScheduled;

  @ManyToOne(() => User)
  initiatingUser: User;

  @ManyToOne(
    () => ClimbAvailabilityScheduled,
    (climbAvailSched) => climbAvailSched.incomingClimbRequests,
  )
  targetScheduledRequest: ClimbAvailabilityScheduled;

  @ManyToOne(
    () => ClimbAvailabilityGen,
    (climbAvailGen) => climbAvailGen.incomingClimbRequests,
  )
  targetGenRequest: ClimbAvailabilityGen;

  @OneToMany(() => ClimbMessage, (climbMessage) => climbMessage.climbRequest, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  messages: ClimbMessage[];

  @ManyToOne(() => User)
  targetUser: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
