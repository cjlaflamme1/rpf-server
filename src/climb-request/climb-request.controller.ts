import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClimbRequestService } from './climb-request.service';
import { CreateClimbRequestDto } from './dto/create-climb-request.dto';
import { UpdateClimbRequestDto } from './dto/update-climb-request.dto';

@Controller('climb-request')
export class ClimbRequestController {
  constructor(private readonly climbRequestService: ClimbRequestService) {}

  @Post()
  create(@Body() createClimbRequestDto: CreateClimbRequestDto) {
    return this.climbRequestService.create(createClimbRequestDto);
  }

  @Get()
  findAll() {
    return this.climbRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climbRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClimbRequestDto: UpdateClimbRequestDto) {
    return this.climbRequestService.update(+id, updateClimbRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climbRequestService.remove(+id);
  }
}
