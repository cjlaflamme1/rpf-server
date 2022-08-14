import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClimbAvailabilityGenService } from 'src/climb-availability-gen/climb-availability-gen.service';
import { ClimbAvailabilityGen } from 'src/climb-availability-gen/entities/climb-availability-gen.entity';
import { User } from 'src/user/entities/user.entity';
import { Not, Raw, Repository } from 'typeorm';
import { CreateClimbAvailabilityScheduledDto } from './dto/create-climb-availability-scheduled.dto';
import { UpdateClimbAvailabilityScheduledDto } from './dto/update-climb-availability-scheduled.dto';
import { ClimbAvailabilityScheduled } from './entities/climb-availability-scheduled.entity';

@Injectable()
export class ClimbAvailabilityScheduledService {
  constructor(
    @InjectRepository(ClimbAvailabilityScheduled)
    private climbAvailSchedRepository: Repository<ClimbAvailabilityScheduled>,
    private climbAvailGenService: ClimbAvailabilityGenService,
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

  async findOne(id: string) {
    return this.climbAvailSchedRepository.findOne(id);
  }

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
  async findSchedMatches(usersSchedule: ClimbAvailabilityScheduled) {
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
      relations: [
        'initialUser',
        'initialUser.climbingProfile',
        'incomingClimbRequests',
        'incomingClimbRequests.climbMeetup',
        'incomingClimbRequests.initiatingEntry',
        'climbRequests',
        'climbRequests.initiatingEntry',
        'climbRequests.climbMeetup',
      ],
      where: {
        startDateTime: Raw(
          (incomingDate) => `DATE(${incomingDate}) >= :compDate `,
          { compDate: reformatUserDate },
        ),
        initialUser: {
          id: Not(usersSchedule.initialUser.id),
          finderVisibility: true,
        },
      },
    });
    if (allDayMatches && allDayMatches.length > 0) {
      allDayMatches.map((dayMatch) => {
        //  This works, but deactivated for small group testing.

        // const dayMatchStartTime = dayMatch.startDateTime.getTime();
        // const startMinusTwoHour = dayMatchStartTime - 7200000;
        // const startPlusTwoHour = dayMatchStartTime + 7200000;
        // const dayMatchEndTime = dayMatch.endDateTime.getTime();
        // const endMinusTwoHour = dayMatchEndTime - 7200000;
        // const endPlusTwoHour = dayMatchEndTime + 7200000;
        // if (
        //   startMinusTwoHour <= usersStartTime &&
        //   startPlusTwoHour >= usersStartTime
        // ) {
        //   returnedMatches.push(dayMatch);
        // } else if (
        //   endMinusTwoHour <= usersEndTime &&
        //   endPlusTwoHour >= usersEndTime
        // ) {
        //   returnedMatches.push(dayMatch);
        // }
        returnedMatches.push(dayMatch);
      });
    }
    const primeUserArea: string[] = usersSchedule.areas
      ? JSON.parse(usersSchedule.areas)
      : [];
    if (primeUserArea.includes('Any') && returnedMatches.length > 0) {
      return returnedMatches.map((newMatch) => {
        newMatch.initialUser.password = null;
        newMatch.areas = newMatch.areas ? JSON.parse(newMatch.areas) : [];
        return newMatch;
      });
    }
    if (returnedMatches.length > 0) {
      return returnedMatches.filter((match) => {
        const matchAreas: string[] = match.areas ? JSON.parse(match.areas) : [];
        const matchedResults: string[] = matchAreas.filter((area) =>
          primeUserArea.includes(area),
        );
        if (
          (matchedResults && matchedResults.length > 0) ||
          matchAreas.includes('Any')
        ) {
          match.initialUser.password = null;
          match.areas = match.areas ? JSON.parse(match.areas) : [];
          return match;
        }
      });
    }
    return returnedMatches;
  }
}
