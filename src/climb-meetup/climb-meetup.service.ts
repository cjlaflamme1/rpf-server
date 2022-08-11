import { Injectable } from '@nestjs/common';
import { CreateClimbMeetupDto } from './dto/create-climb-meetup.dto';
import { UpdateClimbMeetupDto } from './dto/update-climb-meetup.dto';

@Injectable()
export class ClimbMeetupService {
  create(createClimbMeetupDto: CreateClimbMeetupDto) {
    return 'This action adds a new climbMeetup';
  }

  findAll() {
    return `This action returns all climbMeetup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} climbMeetup`;
  }

  update(id: number, updateClimbMeetupDto: UpdateClimbMeetupDto) {
    return `This action updates a #${id} climbMeetup`;
  }

  remove(id: number) {
    return `This action removes a #${id} climbMeetup`;
  }
}
