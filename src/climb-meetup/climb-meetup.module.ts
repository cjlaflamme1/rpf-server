import { Module } from '@nestjs/common';
import { ClimbMeetupService } from './climb-meetup.service';
import { ClimbMeetupController } from './climb-meetup.controller';

@Module({
  controllers: [ClimbMeetupController],
  providers: [ClimbMeetupService]
})
export class ClimbMeetupModule {}
