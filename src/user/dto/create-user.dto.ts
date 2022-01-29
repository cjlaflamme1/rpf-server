import { ClimberProfile } from 'src/climber-profile/entities/climber-profile.entity';

export class CreateUserDto {
  climbingProfile: ClimberProfile;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
}
