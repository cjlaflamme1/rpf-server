import { Module } from '@nestjs/common';
import { ClimbMeetupService } from './climb-meetup.service';
import { ClimbMeetupController } from './climb-meetup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbMeetup } from './entities/climb-meetup.entity';
import { UserModule } from 'src/user/user.module';
import { ClimbRequestService } from 'src/climb-request/climb-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClimbMeetup]),
    UserModule,
    ClimbRequestService,
  ],
  exports: [ClimbMeetupService],
  controllers: [ClimbMeetupController],
  providers: [ClimbMeetupService],
})
export class ClimbMeetupModule {}
