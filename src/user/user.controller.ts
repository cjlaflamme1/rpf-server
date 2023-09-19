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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IncomingUserDTO } from './dto/incoming-user-dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: IncomingUserDTO) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findCurrent(@Req() req) {
    return this.userService.findByEmail(req.user.email, ['climbingProfile']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id, ['climbingProfile']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
