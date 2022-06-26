import { ClimbAvailabilityGen } from 'src/climb-availability-gen/entities/climb-availability-gen.entity';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
