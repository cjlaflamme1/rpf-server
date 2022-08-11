import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClimbMeetupDto } from './dto/create-climb-meetup.dto';
import { UpdateClimbMeetupDto } from './dto/update-climb-meetup.dto';
import { ClimbMeetup } from './entities/climb-meetup.entity';

@Injectable()
export class ClimbMeetupService {
  constructor(
    @InjectRepository(ClimbMeetup)
    private climbMeetupRepository: Repository<ClimbMeetup>,
  ) {}
  create(createClimbMeetupDto: CreateClimbMeetupDto) {
    return this.climbMeetupRepository.save(createClimbMeetupDto);
  }

  // findAll() {
  //   return `This action returns all climbMeetup`;
  // }

  findOne(id: string, relations: string[] = []) {
    return this.climbMeetupRepository.findOne(id, { relations });
  }

  async update(
    id: string,
    updateClimbMeetupDto: UpdateClimbMeetupDto,
    relations: string[] = [],
  ) {
    const climbMeetup = await this.climbMeetupRepository.save({
      id,
      ...updateClimbMeetupDto,
    });
    return this.findOne(climbMeetup.id, relations);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} climbMeetup`;
  // }
}
