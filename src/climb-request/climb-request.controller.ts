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
import { ClimbAvailabilityGenService } from 'src/climb-availability-gen/climb-availability-gen.service';
import { ClimbAvailabilityScheduledService } from 'src/climb-availability-scheduled/climb-availability-scheduled.service';
import { UserService } from 'src/user/user.service';
import { ClimbRequestService } from './climb-request.service';
import {
  CreateClimbRequestDto,
  incomingCreateClimbRequestDto,
} from './dto/create-climb-request.dto';
import { UpdateClimbRequestDto } from './dto/update-climb-request.dto';

@Controller('climb-request')
@UseGuards(JwtAuthGuard)
export class ClimbRequestController {
  constructor(
    private readonly climbRequestService: ClimbRequestService,
    private readonly userService: UserService,
    private readonly climbAvailSchedService: ClimbAvailabilityScheduledService,
    private readonly climbAvailGenService: ClimbAvailabilityGenService,
  ) {}
  logger = new Logger(ClimbRequestController.name);

  @Post()
  async create(
    @Body()
    incomingDto: incomingCreateClimbRequestDto,
    @Req()
    req,
  ) {
    const user = await this.userService.findByEmail(req.user.email);
    this.logger.log(JSON.stringify(user));
    const createClimbRequestDto: CreateClimbRequestDto = {
      initiatingEntry: await this.climbAvailSchedService.findOne(
        incomingDto.initiatingEntryId,
      ),
      initiatingUser: user,
      targetScheduledRequest: incomingDto.targetScheduledReqId
        ? await this.climbAvailSchedService.findOne(
            incomingDto.targetScheduledReqId,
          )
        : null,
      targetGenRequest: incomingDto.targetGenRequestId
        ? await this.climbAvailGenService.findOne(
            incomingDto.targetGenRequestId,
          )
        : null,
      targetUser: await this.userService.findOne(incomingDto.targetUserId),
    };
    this.logger.log(JSON.stringify(createClimbRequestDto));
    return this.climbRequestService.create(createClimbRequestDto);
  }

  @Get()
  async findAll(@Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'receivedClimbRequests',
      'receivedClimbRequests.targetGenRequest',
      'receivedClimbRequests.targetScheduledRequest',
      'receivedClimbRequests.initiatingUser',
      'receivedClimbRequests.initiatingEntry',
    ]);
    if (user.receivedClimbRequests && user.receivedClimbRequests.length > 0) {
      return user.receivedClimbRequests;
    }
    return [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const request = await this.climbRequestService.findOne(id, [
      'targetGenRequest',
      'targetScheduledRequest',
      'initiatingUser',
      'initiatingEntry',
      'targetUser',
    ]);
    if (
      (request.targetUser && request.targetUser.email === req.user.email) ||
      (request.initiatingUser &&
        request.initiatingUser.email === req.user.email)
    ) {
      return request;
    }
    throw new HttpException(
      'You do not have permission to view this request',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClimbRequestDto: UpdateClimbRequestDto,
    @Req() req,
  ) {
    const currentMatch = await this.climbRequestService.findOne(id, [
      'initiatingUser',
      'targetUser',
    ]);
    if (
      (currentMatch.targetUser &&
        currentMatch.targetUser.email === req.user.email) ||
      (currentMatch.initiatingUser &&
        currentMatch.initiatingUser.email === req.user.email)
    ) {
      return this.climbRequestService.update(id, updateClimbRequestDto);
    }
    throw new HttpException(
      'You do not have permission to update this request',
      HttpStatus.BAD_REQUEST,
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.climbRequestService.remove(+id);
  // }
}
