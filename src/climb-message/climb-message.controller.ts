import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClimbMessageService } from './climb-message.service';
import { CreateClimbMessageDto } from './dto/create-climb-message.dto';
import { UpdateClimbMessageDto } from './dto/update-climb-message.dto';

@Controller('climb-message')
export class ClimbMessageController {
  constructor(private readonly climbMessageService: ClimbMessageService) {}

  @Post()
  create(@Body() createClimbMessageDto: CreateClimbMessageDto) {
    return this.climbMessageService.create(createClimbMessageDto);
  }

  @Get()
  findAll() {
    return this.climbMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climbMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClimbMessageDto: UpdateClimbMessageDto) {
    return this.climbMessageService.update(+id, updateClimbMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climbMessageService.remove(+id);
  }
}
