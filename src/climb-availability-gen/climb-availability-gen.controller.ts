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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { ClimbAvailabilityGenService } from './climb-availability-gen.service';
import { CreateClimbAvailabilityGenDto } from './dto/create-climb-availability-gen.dto';
import { UpdateClimbAvailabilityGenDto } from './dto/update-climb-availability-gen.dto';

@Controller('climb-availability-gen')
@UseGuards(JwtAuthGuard)
export class ClimbAvailabilityGenController {
  constructor(
    private readonly climbAvailabilityGenService: ClimbAvailabilityGenService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createClimbAvailabilityGenDto: CreateClimbAvailabilityGenDto,
    @Req() req,
  ) {
    const user = await this.userService.findByEmail(req.user.email);
    if (user) {
      return this.climbAvailabilityGenService.create(
        createClimbAvailabilityGenDto,
        user,
      );
    }
  }

  @Get()
  async findAll(@Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbAvailabilityGen',
    ]);
    if (
      user &&
      user.climbAvailabilityGen &&
      user.climbAvailabilityGen.length > 0
    ) {
      return user.climbAvailabilityGen;
    }
    return [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbAvailabilityGen',
    ]);
    if (user) {
      if (
        user.climbAvailabilityGen &&
        user.climbAvailabilityGen.length > 0 &&
        user.climbAvailabilityGen.find((avail) => avail.id === id)
      ) {
        const item = user.climbAvailabilityGen.find((avail) => avail.id === id);
        return item;
      }
    }
    throw new HttpException(
      'You are not authorized to view this calendar',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClimbAvailabilityGenDto: UpdateClimbAvailabilityGenDto,
    @Req() req,
  ) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbAvailabilityGen',
    ]);
    if (user) {
      if (
        user.climbAvailabilityGen &&
        user.climbAvailabilityGen.length > 0 &&
        user.climbAvailabilityGen.find((avail) => avail.id === id)
      ) {
        return this.climbAvailabilityGenService.update(
          id,
          updateClimbAvailabilityGenDto,
        );
      }
    }
    throw new HttpException(
      'You are not authorized to edit this calendar',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const user = await this.userService.findByEmail(req.user.email, [
      'climbAvailabilityGen',
    ]);
    if (user) {
      if (
        user.climbAvailabilityGen &&
        user.climbAvailabilityGen.length > 0 &&
        user.climbAvailabilityGen.find((avail) => avail.id === id)
      ) {
        return this.climbAvailabilityGenService.remove(id);
      }
    }
    throw new HttpException(
      'You are not authorized to delete this calendar',
      HttpStatus.BAD_REQUEST,
    );
  }
}
