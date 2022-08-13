import { ClimbMessage } from 'src/climb-message/entities/climb-message.entity';
import { ClimbRequest } from 'src/climb-request/entities/climb-request.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateClimbMeetupDto {
  climbRequest: ClimbRequest;
  messages?: ClimbMessage[];
  users: User[];
}
