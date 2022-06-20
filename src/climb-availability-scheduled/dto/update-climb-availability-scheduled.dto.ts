import { PartialType } from '@nestjs/mapped-types';
import { CreateClimbAvailabilityScheduledDto } from './create-climb-availability-scheduled.dto';

export class UpdateClimbAvailabilityScheduledDto extends PartialType(CreateClimbAvailabilityScheduledDto) {}
