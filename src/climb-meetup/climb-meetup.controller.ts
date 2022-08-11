import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClimbMeetupService } from './climb-meetup.service';
import { CreateClimbMeetupDto } from './dto/create-climb-meetup.dto';
import { UpdateClimbMeetupDto } from './dto/update-climb-meetup.dto';

@Controller('climb-meetup')
@UseGuards(JwtAuthGuard)
export class ClimbMeetupController {
  constructor(private readonly climbMeetupService: ClimbMeetupService) {}

  @Post()
  create(@Body() createClimbMeetupDto: CreateClimbMeetupDto) {
    return this.climbMeetupService.create(createClimbMeetupDto);
  }

  @Get()
  findAll() {
    return this.climbMeetupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climbMeetupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimbMeetupDto: UpdateClimbMeetupDto,
  ) {
    return this.climbMeetupService.update(+id, updateClimbMeetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climbMeetupService.remove(+id);
  }
}
