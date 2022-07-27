import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClimbRequestDto } from './dto/create-climb-request.dto';
import { UpdateClimbRequestDto } from './dto/update-climb-request.dto';
import { ClimbRequest } from './entities/climb-request.entity';

@Injectable()
export class ClimbRequestService {
  constructor(
    @InjectRepository(ClimbRequest)
    private climbRequestRepository: Repository<ClimbRequest>,
  ) {}
  create(createClimbRequestDto: CreateClimbRequestDto) {
    return this.climbRequestRepository.save(createClimbRequestDto);
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
