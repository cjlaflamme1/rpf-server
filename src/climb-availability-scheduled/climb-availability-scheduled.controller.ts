import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { ClimbAvailabilityScheduledService } from './climb-availability-scheduled.service';
import { CreateClimbAvailabilityScheduledDto } from './dto/create-climb-availability-scheduled.dto';
import { UpdateClimbAvailabilityScheduledDto } from './dto/update-climb-availability-scheduled.dto';

@Controller('climb-availability-scheduled')
@UseGuards(JwtAuthGuard)
export class ClimbAvailabilityScheduledController {
  constructor(
    private readonly climbAvailabilityScheduledService: ClimbAvailabilityScheduledService,
    private readonly userService: UserService,
  ) {}
  logger = new Logger(ClimbAvailabilityScheduledController.name);

  @Post()
  async create(
    @Body()
    createClimbAvailabilityScheduledDto: CreateClimbAvailabilityScheduledDto,
    @Req() req,
  ) {
    const user = await this.userService.findByEmail(req.user.email);
    if (user) {
      return this.climbAvailabilityScheduledService.create(
        createClimbAvailabilityScheduledDto,
        user,
      );
    }
  }

  @Get()
  async findAll(@Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbAvailabilityScheduled',
      'climbAvailabilityScheduled.initialUser',
    ]);
    if (
      user &&
      user.climbAvailabilityScheduled &&
      user.climbAvailabilityScheduled.length > 0
    ) {
      return await Promise.all(
        user.climbAvailabilityScheduled.map(async (userSchedule) => ({
          ...userSchedule,
          matches: await this.climbAvailabilityScheduledService.findMatches(
            userSchedule,
          ),
        })),
      );
    }
    return [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbAvailabilityScheduled',
      'climbAvailabilityScheduled.initialUser',
    ]);
    if (user) {
      if (
        user.climbAvailabilityScheduled &&
        user.climbAvailabilityScheduled.length > 0 &&
        user.climbAvailabilityScheduled.find((avail) => avail.id === id)
      ) {
        const item = user.climbAvailabilityScheduled.find(
          (avail) => avail.id === id,
        );
        const repackageItem = {
          ...item,
          matches: await this.climbAvailabilityScheduledService.findMatches(
            item,
          ),
        };
        return repackageItem;
      }
    }
    throw new HttpException(
      'You are not authorized to view this calendar',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateClimbAvailabilityScheduledDto: UpdateClimbAvailabilityScheduledDto,
  ) {
    return this.climbAvailabilityScheduledService.update(
      id,
      updateClimbAvailabilityScheduledDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climbAvailabilityScheduledService.remove(id);
  }
}
