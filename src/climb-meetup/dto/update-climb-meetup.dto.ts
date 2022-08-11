import { PartialType } from '@nestjs/mapped-types';
import { CreateClimbMeetupDto } from './create-climb-meetup.dto';

export class UpdateClimbMeetupDto extends PartialType(CreateClimbMeetupDto) {}
