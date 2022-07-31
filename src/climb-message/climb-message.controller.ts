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
import { UserService } from 'src/user/user.service';
import { ClimbMessageService } from './climb-message.service';
import { CreateClimbMessageDto } from './dto/create-climb-message.dto';
import { UpdateClimbMessageDto } from './dto/update-climb-message.dto';

@Controller('climb-message')
@UseGuards(JwtAuthGuard)
export class ClimbMessageController {
  constructor(
    private readonly climbMessageService: ClimbMessageService,
    private userService: UserService,
  ) {}

  @Post()
  create(@Body() createClimbMessageDto: CreateClimbMessageDto) {
    return this.climbMessageService.create(createClimbMessageDto);
  }

  @Get()
  async findAll(@Req() req) {
    // const user = await this.userService.findByEmail(req.user.email, [
    //   'receivedClimbRequests',
    //   'receivedClimbRequests.targetGenRequest',
    //   'receivedClimbRequests.targetScheduledRequest',
    //   'receivedClimbRequests.initiatingUser',
    //   'receivedClimbRequests.initiatingEntry',
    // ]);
    // if (user.receivedClimbRequests && user.receivedClimbRequests.length > 0) {
    //   return user.receivedClimbRequests;
    // }
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climbMessageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimbMessageDto: UpdateClimbMessageDto,
  ) {
    return this.climbMessageService.update(+id, updateClimbMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climbMessageService.remove(+id);
  }
}
