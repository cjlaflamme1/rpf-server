import { Module } from '@nestjs/common';
import { ClimbMeetupService } from './climb-meetup.service';
import { ClimbMeetupController } from './climb-meetup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbMeetup } from './entities/climb-meetup.entity';
import { UserModule } from 'src/user/user.module';
import { ClimbRequestModule } from 'src/climb-request/climb-request.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClimbMeetup]),
    UserModule,
    ClimbRequestModule,
  ],
  exports: [ClimbMeetupService],
  controllers: [ClimbMeetupController],
  providers: [ClimbMeetupService],
})
export class ClimbMeetupModule {}
