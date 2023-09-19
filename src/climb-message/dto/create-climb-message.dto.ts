import { ClimbMeetup } from 'src/climb-meetup/entities/climb-meetup.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateClimbMessageDto {
  message: string;
  climbMeetup: ClimbMeetup;
  user: User;
}
