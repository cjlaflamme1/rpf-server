import { CreateClimberProfileDto } from 'src/climber-profile/dto/create-climber-profile.dto';

export class CreateUserDto {
  climbingProfile: CreateClimberProfileDto;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
}
