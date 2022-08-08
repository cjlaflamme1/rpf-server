import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ClimberProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.climbingProfile)
  climber: User;

  @Column({
    nullable: true,
    type: 'text',
  })
  climberBio: string;

  @Column()
  trOnly: boolean;

  @Column()
  leadCapable: boolean;

  @Column()
  boulderer: boolean;

  @Column({
    nullable: true,
  })
  trWarmup: string;

  @Column({
    nullable: true,
  })
  trOnsight: string;

  @Column({
    nullable: true,
  })
  trRedpoint: string;

  @Column({
    nullable: true,
  })
  leadWarmup: string;

  @Column({
    nullable: true,
  })
  leadOnsight: string;

  @Column({
    nullable: true,
  })
  leadRedpoint: string;

  @Column({
    nullable: true,
  })
  boulderWarmup: string;

  @Column({
    nullable: true,
  })
  boulderOnsight: string;

  @Column({
    nullable: true,
  })
  boulderRedpoint: string;

  // Favorite crags joined to a crags table.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
