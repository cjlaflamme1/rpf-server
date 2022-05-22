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
} from 'typeorm';

@Entity()
export class ClimbAvailabilityGen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column()
  startHour: number;

  @Column()
  startMinute: number;

  @Column()
  startAMPM: string;

  @Column()
  finishHour: number;

  @Column()
  finishMinute: number;

  @Column()
  areas: string;

  @Column()
  finishAMPM: string;

  @ManyToOne(() => User, (user) => user.climbAvailabilityGen)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
