import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClimbAvailabilityScheduled } from 'src/climb-availability-scheduled/entities/climb-availability-scheduled.entity';
import { daysOfWeek } from 'src/models/daysOfWeek';
import { User } from 'src/user/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateClimbAvailabilityGenDto } from './dto/create-climb-availability-gen.dto';
import { UpdateClimbAvailabilityGenDto } from './dto/update-climb-availability-gen.dto';
import { ClimbAvailabilityGen } from './entities/climb-availability-gen.entity';

@Injectable()
export class ClimbAvailabilityGenService {
  constructor(
    @InjectRepository(ClimbAvailabilityGen)
    private climbAvailabilityGenRepository: Repository<ClimbAvailabilityGen>,
  ) {}
  create(
    createClimbAvailabilityGenDto: CreateClimbAvailabilityGenDto,
    user: User,
  ) {
    return this.climbAvailabilityGenRepository.save({
      ...createClimbAvailabilityGenDto,
      areas: JSON.stringify(createClimbAvailabilityGenDto.areas),
      user,
    });
  }

  // findAll() {
  //   return `This action returns all climbAvailabilityGen`;
  // }

  findOne(id: string) {
    return this.climbAvailabilityGenRepository.findOne(id);
  }

  async update(
    id: string,
    updateClimbAvailabilityGenDto: UpdateClimbAvailabilityGenDto,
  ) {
    const oldItem = await this.climbAvailabilityGenRepository.findOne(id);
    if (updateClimbAvailabilityGenDto.areas) {
      oldItem.areas = JSON.stringify(updateClimbAvailabilityGenDto.areas);
    }
    return this.climbAvailabilityGenRepository.save({
      ...updateClimbAvailabilityGenDto,
      areas: oldItem.areas,
      id,
    });
  }

  async remove(id: string) {
    const item = await this.climbAvailabilityGenRepository.findOne(id);
    if (item) {
      return this.climbAvailabilityGenRepository.softRemove(item);
    }
    return HttpStatus.NOT_FOUND;
  }

  async findMatches(usersSchedule: ClimbAvailabilityScheduled) {
    const returnedMatches: ClimbAvailabilityGen[] = [];
    // const usersStartTime = usersSchedule.startDateTime.getTime();
    // const usersEndTime = new Date(usersSchedule.endDateTime).getTime();
    const dayMatches = await this.climbAvailabilityGenRepository.find({
      relations: [
        'user',
        'user.climbingProfile',
        'incomingClimbRequests',
        'incomingClimbRequests.initiatingEntry',
      ],
      where: {
        day: daysOfWeek[new Date(usersSchedule.startDateTime).getDay()],
        user: {
          id: Not(usersSchedule.initialUser.id),
          finderVisibility: true,
        },
      },
    });
    if (dayMatches && dayMatches.length > 0) {
      // const return24Hour = (time: number, amPm: string) => {
      //   if (amPm === 'AM') {
      //     return time;
      //   }
      //   if (time !== 12) {
      //     return time + 12;
      //   }
      // };
      dayMatches.map((dayMatch) => {
        returnedMatches.push(dayMatch);
        // Figure out logic to compare the times

        // const dayMatchStartTime = new Date(usersSchedule.startDateTime);
        // const startHour = return24Hour(dayMatch.startHour, dayMatch.startAMPM);
        // dayMatchStartTime.setHours(startHour);
        // dayMatchStartTime.setMinutes(dayMatch.startMinute);
        // const startMinusTwoHour = dayMatchStartTime.getTime() - 7200000;
        // const startPlusTwoHour = dayMatchStartTime.getTime() + 7200000;
        // const dayMatchEndTime = new Date(usersSchedule.endDateTime);
        // const endHour = return24Hour(dayMatch.finishHour, dayMatch.finishAMPM);
        // dayMatchEndTime.setHours(endHour);
        // dayMatchEndTime.setMinutes(dayMatch.finishMinute);
        // const endMinusTwoHour = dayMatchEndTime.getTime() - 7200000;
        // const endPlusTwoHour = dayMatchEndTime.getTime() + 7200000;
        // this.logger.log(`Users start time: ${new Date(usersStartTime)}`);
        // this.logger.log(
        //   `Match minus 2 start time: ${new Date(startMinusTwoHour)}`,
        // );
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
      });
    }
    const primeUserArea: string[] = usersSchedule.areas
      ? JSON.parse(usersSchedule.areas)
      : [];
    if (primeUserArea.includes('Any') && returnedMatches.length > 0) {
      return returnedMatches.map((newMatch) => {
        newMatch.user.password = null;
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
          match.user.password = null;
          match.areas = match.areas ? JSON.parse(match.areas) : [];
          return match;
        }
      });
    }
    return returnedMatches;
  }
}
