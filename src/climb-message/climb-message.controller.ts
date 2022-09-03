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
import { ClimbMeetupService } from 'src/climb-meetup/climb-meetup.service';
import { UserService } from 'src/user/user.service';
import { ClimbMessageService } from './climb-message.service';
import { IncomingMessageDto } from './dto/incomingMessage.dto';
import { UpdateClimbMessageDto } from './dto/update-climb-message.dto';

@Controller('climb-message')
@UseGuards(JwtAuthGuard)
export class ClimbMessageController {
  constructor(
    private readonly climbMessageService: ClimbMessageService,
    private userService: UserService,
    private climbMeetupService: ClimbMeetupService,
  ) {}

  @Post()
  async create(@Body() createClimbMessageDto: IncomingMessageDto, @Req() req) {
    return this.climbMessageService.create({
      message: createClimbMessageDto.message,
      user: await this.userService.findByEmail(req.user.email),
      climbMeetup: await this.climbMeetupService.findOne(
        createClimbMessageDto.climbMeetupId,
        ['users'],
      ),
    });
  }

  // @Get()
  // async findAll(@Req() req) {
  //   return [];
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.climbMessageService.findOne(id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimbMessageDto: UpdateClimbMessageDto,
  ) {
    return this.climbMessageService.update(id, updateClimbMessageDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.climbMessageService.remove(+id);
  // }
}
