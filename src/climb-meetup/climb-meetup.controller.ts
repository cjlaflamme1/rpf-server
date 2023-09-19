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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClimbRequestService } from 'src/climb-request/climb-request.service';
import { UserService } from 'src/user/user.service';
import { ClimbMeetupService } from './climb-meetup.service';
import { IncomingMeetupDto } from './dto/incomingMeetup.dto';
import { UpdateClimbMeetupDto } from './dto/update-climb-meetup.dto';

@Controller('climb-meetup')
@UseGuards(JwtAuthGuard)
export class ClimbMeetupController {
  constructor(
    private readonly climbMeetupService: ClimbMeetupService,
    private userService: UserService,
    private climbRequestService: ClimbRequestService,
  ) {}

  @Post()
  async create(@Body() createClimbMeetupDto: IncomingMeetupDto) {
    return this.climbMeetupService.create({
      users: await this.userService.findByIds(createClimbMeetupDto.userIds),
      climbRequest: await this.climbRequestService.findOne(
        createClimbMeetupDto.climbRequestId,
      ),
      climbDate: createClimbMeetupDto.climbDate,
    });
  }

  @Get()
  async findAll(@Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbMeetups',
      'climbMeetups.messages',
      'climbMeetups.messages.user',
      'climbMeetups.users',
      'climbMeetups.users.climbingProfile',
      'climbMeetups.climbRequest',
      'climbMeetups.climbRequest.initiatingEntry',
    ]);
    if (user.climbMeetups && user.climbMeetups.length > 0) {
      const todayMinus2 = new Date();
      todayMinus2.setDate(todayMinus2.getDate() - 2);
      const currentOnly = user.climbMeetups.filter(
        (meet) => meet.climbDate.valueOf() >= todayMinus2.valueOf(),
      );
      if (currentOnly && currentOnly.length > 0) {
        return currentOnly;
      }
    }
    return [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const user = await this.userService.findByEmail(req.user.email);
    const requestedMeetup = await this.climbMeetupService.findOne(id, [
      'climbRequest',
      'climbRequest.initiatingEntry',
      'messages',
      'messages.user',
      'users',
    ]);
    if (
      user &&
      requestedMeetup &&
      requestedMeetup.users &&
      requestedMeetup.users.length > 0 &&
      requestedMeetup.users.find((u) => u.id === user.id)
    ) {
      return requestedMeetup;
    }
    throw new HttpException(
      'You are not permitted to view this match.',
      HttpStatus.FORBIDDEN,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimbMeetupDto: UpdateClimbMeetupDto,
  ) {
    return this.climbMeetupService.update(id, updateClimbMeetupDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.climbMeetupService.remove(+id);
  // }
}
