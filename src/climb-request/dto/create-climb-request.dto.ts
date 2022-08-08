import { ClimbAvailabilityGen } from 'src/climb-availability-gen/entities/climb-availability-gen.entity';
import { ClimbAvailabilityScheduled } from 'src/climb-availability-scheduled/entities/climb-availability-scheduled.entity';
import { User } from 'src/user/entities/user.entity';

export class incomingCreateClimbRequestDto {
  initialMessage?: string;
  initiatingEntryId: string;
  targetScheduledReqId?: string;
  targetGenRequestId?: string;
  targetUserId: string;
}

export class CreateClimbRequestDto {
  initialMessage?: string;
  initiatingEntry: ClimbAvailabilityScheduled;
  initiatingUser: User;
  targetScheduledRequest?: ClimbAvailabilityScheduled;
  targetGenRequest?: ClimbAvailabilityGen;
  targetUser: User;
}
