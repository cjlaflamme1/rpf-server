import { User } from 'src/user/entities/user.entity';

export class CreateClimberProfileDto {
  climber: User;
  trOnly: boolean;
  leadCapable: boolean;
  boulderer: boolean;
  trWarmup?: string;
  trOnsight?: string;
  trRedpoint?: string;
  leadWarmup?: string;
  leadOnsight?: string;
  leadRedpoint?: string;
  boulderWarmup?: string;
  boulderOnsight?: string;
  boulderRedpoint?: string;
}
