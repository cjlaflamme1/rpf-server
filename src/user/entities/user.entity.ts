import { ClimbAvailabilityGen } from 'src/climb-availability-gen/entities/climb-availability-gen.entity';
import { ClimbAvailabilityScheduled } from 'src/climb-availability-scheduled/entities/climb-availability-scheduled.entity';
import { ClimbRequest } from 'src/climb-request/entities/climb-request.entity';
import { ClimberProfile } from 'src/climber-profile/entities/climber-profile.entity';
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
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ClimberProfile, (climberProfile) => climberProfile.climber, {
    cascade: ['insert', 'soft-remove', 'update'],
  })
  @JoinColumn()
  climbingProfile: ClimberProfile;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  profilePhoto: string;

  @Column({
    default: true,
  })
  finderVisibility: boolean;

  @OneToMany(
    () => ClimbAvailabilityGen,
    (climbAvailabilityGen) => climbAvailabilityGen.user,
  )
  climbAvailabilityGen: ClimbAvailabilityGen[];

  @OneToMany(
    () => ClimbAvailabilityScheduled,
    (climbAvailabilityScheduled) => climbAvailabilityScheduled.initialUser,
  )
  climbAvailabilityScheduled: ClimbAvailabilityScheduled[];

  @OneToMany(() => ClimbRequest, (climbRequest) => climbRequest.targetUser)
  receivedClimbRequests: ClimbRequest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
