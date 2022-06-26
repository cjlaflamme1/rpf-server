import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { doesNotMatch } from 'assert';
import { User } from 'src/user/entities/user.entity';
import { MoreThan, MoreThanOrEqual, Not, Raw, Repository } from 'typeorm';
import { CreateClimbAvailabilityScheduledDto } from './dto/create-climb-availability-scheduled.dto';
import { UpdateClimbAvailabilityScheduledDto } from './dto/update-climb-availability-scheduled.dto';
import { ClimbAvailabilityScheduled } from './entities/climb-availability-scheduled.entity';

@Injectable()
export class ClimbAvailabilityScheduledService {
  constructor(
    @InjectRepository(ClimbAvailabilityScheduled)
    private climbAvailSchedRepository: Repository<ClimbAvailabilityScheduled>,
  ) {}
  logger = new Logger(ClimbAvailabilityScheduledService.name);
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
  async findMatches(usersSchedule: ClimbAvailabilityScheduled) {
    const returnedMatches: ClimbAvailabilityScheduled[] = [];
    const usersStartTime = usersSchedule.startDateTime.getTime();
    const usersEndTime = usersSchedule.endDateTime.getTime();
    const currentUserDate = new Date(usersSchedule.startDateTime);
    const reformatUserDate = new Date(
      currentUserDate.getTime() - currentUserDate.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split('T')[0];
    const allDayMatches = await this.climbAvailSchedRepository.find({
      relations: ['initialUser'],
      where: {
        // startDateTime: MoreThanOrEqual(
        //   new Date(usersSchedule.startDateTime).toISOString(),
        // ),
        startDateTime: Raw(
          (incomingDate) => `DATE(${incomingDate}) >= :compDate `,
          { compDate: reformatUserDate },
        ),
        initialUser: {
          id: Not(usersSchedule.initialUser.id),
        },
      },
    });
    if (allDayMatches && allDayMatches.length > 0) {
      allDayMatches.map((dayMatch) => {
        const dayMatchStartTime = dayMatch.startDateTime.getTime();
        const startMinusTwoHour = dayMatchStartTime - 7200000;
        const startPlusTwoHour = dayMatchStartTime + 7200000;
        const dayMatchEndTime = dayMatch.endDateTime.getTime();
        const endMinusTwoHour = dayMatchEndTime - 7200000;
        const endPlusTwoHour = dayMatchEndTime + 7200000;
        if (
          startMinusTwoHour <= usersStartTime &&
          startPlusTwoHour >= usersStartTime
        ) {
          returnedMatches.push(dayMatch);
        } else if (
          endMinusTwoHour <= usersEndTime &&
          endPlusTwoHour >= usersEndTime
        ) {
          returnedMatches.push(dayMatch);
        }
      });
    }
    return returnedMatches;
  }
}
