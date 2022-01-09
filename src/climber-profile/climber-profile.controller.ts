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
import { ClimberProfileService } from './climber-profile.service';
import { CreateClimberProfileDto } from './dto/create-climber-profile.dto';
import { UpdateClimberProfileDto } from './dto/update-climber-profile.dto';

@Controller('climber-profile')
@UseGuards(JwtAuthGuard)
export class ClimberProfileController {
  constructor(private readonly climberProfileService: ClimberProfileService) {}

  @Post()
  create(@Body() createClimberProfileDto: CreateClimberProfileDto) {
    return this.climberProfileService.create(createClimberProfileDto);
  }

  @Get()
  findAll() {
    return this.climberProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climberProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimberProfileDto: UpdateClimberProfileDto,
  ) {
    return this.climberProfileService.update(+id, updateClimberProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climberProfileService.remove(+id);
  }
}
