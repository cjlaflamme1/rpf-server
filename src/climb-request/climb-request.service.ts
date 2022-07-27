import { Injectable } from '@nestjs/common';
import { CreateClimbRequestDto } from './dto/create-climb-request.dto';
import { UpdateClimbRequestDto } from './dto/update-climb-request.dto';

@Injectable()
export class ClimbRequestService {
  create(createClimbRequestDto: CreateClimbRequestDto) {
    return 'This action adds a new climbRequest';
  }

  findAll() {
    return `This action returns all climbRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} climbRequest`;
  }

  update(id: number, updateClimbRequestDto: UpdateClimbRequestDto) {
    return `This action updates a #${id} climbRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} climbRequest`;
  }
}
