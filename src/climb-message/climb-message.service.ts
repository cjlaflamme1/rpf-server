import { Injectable } from '@nestjs/common';
import { CreateClimbMessageDto } from './dto/create-climb-message.dto';
import { UpdateClimbMessageDto } from './dto/update-climb-message.dto';

@Injectable()
export class ClimbMessageService {
  create(createClimbMessageDto: CreateClimbMessageDto) {
    return 'This action adds a new climbMessage';
  }

  findAll() {
    return `This action returns all climbMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} climbMessage`;
  }

  update(id: number, updateClimbMessageDto: UpdateClimbMessageDto) {
    return `This action updates a #${id} climbMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} climbMessage`;
  }
}
