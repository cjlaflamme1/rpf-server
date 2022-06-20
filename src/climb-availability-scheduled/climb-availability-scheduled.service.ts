import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateClimbAvailabilityScheduledDto } from './dto/create-climb-availability-scheduled.dto';
import { UpdateClimbAvailabilityScheduledDto } from './dto/update-climb-availability-scheduled.dto';
import { ClimbAvailabilityScheduled } from './entities/climb-availability-scheduled.entity';

@Injectable()
export class ClimbAvailabilityScheduledService {
  constructor(
    @InjectRepository(ClimbAvailabilityScheduled)
    private climbAvailSchedRepository: Repository<ClimbAvailabilityScheduled>,
  ) {}
  create(
    createClimbAvailabilityScheduledDto: CreateClimbAvailabilityScheduledDto,
    user: User,
  ) {
    return this.climbAvailSchedRepository.save({
      ...createClimbAvailabilityScheduledDto,
      areas: JSON.stringify(createClimbAvailabilityScheduledDto.areas),
      initialUser: user,
    });
  }

  // findAll() {
  //   return `This action returns all climbAvailabilityScheduled`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} climbAvailabilityScheduled`;
  // }

  update(
    id: string,
    updateClimbAvailabilityScheduledDto: UpdateClimbAvailabilityScheduledDto,
  ) {
    if (updateClimbAvailabilityScheduledDto.areas) {
      updateClimbAvailabilityScheduledDto.areas = JSON.stringify(
        updateClimbAvailabilityScheduledDto.areas,
      );
    }
    return this.climbAvailSchedRepository.save({
      ...updateClimbAvailabilityScheduledDto,
      id,
    });
  }

  async remove(id: string) {
    const item = await this.climbAvailSchedRepository.findOne(id);
    if (item) {
      return this.climbAvailSchedRepository.softRemove(item);
    }
    return HttpStatus.NOT_FOUND;
  }
}
