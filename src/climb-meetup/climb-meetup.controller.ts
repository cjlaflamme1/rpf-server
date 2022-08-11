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
    });
  }

  @Get()
  async findAll(@Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbMeetups',
      'climbMeetups.users',
      'climbMeetups.messages',
      'climbMeetups.climbRequest',
    ]);
    if (user.climbMeetups && user.climbMeetups.length > 0) {
      return user.climbMeetups;
    }
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climbMeetupService.findOne(id);
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
