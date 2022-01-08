import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClimberProfileService } from './climber-profile.service';
import { CreateClimberProfileDto } from './dto/create-climber-profile.dto';
import { UpdateClimberProfileDto } from './dto/update-climber-profile.dto';

@Controller('climber-profile')
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
  update(@Param('id') id: string, @Body() updateClimberProfileDto: UpdateClimberProfileDto) {
    return this.climberProfileService.update(+id, updateClimberProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climberProfileService.remove(+id);
  }
}
