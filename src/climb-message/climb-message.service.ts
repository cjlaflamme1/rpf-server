import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClimbMessageDto } from './dto/create-climb-message.dto';
import { UpdateClimbMessageDto } from './dto/update-climb-message.dto';
import { ClimbMessage } from './entities/climb-message.entity';

@Injectable()
export class ClimbMessageService {
  constructor(
    @InjectRepository(ClimbMessage)
    private climbMessageRepository: Repository<ClimbMessage>,
  ) {}
  create(createClimbMessageDto: CreateClimbMessageDto) {
    return this.climbMessageRepository.save(createClimbMessageDto);
  }

  // findAll() {
  //   return `This action returns all climbMessage`;
  // }

  // findOne(id: string, relations: string[] = []) {
  //   return this.climbMessageRepository.findOne(id, { relations });
  // }

  update(id: string, updateClimbMessageDto: UpdateClimbMessageDto) {
    return this.climbMessageRepository.save({
      id,
      ...updateClimbMessageDto,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} climbMessage`;
  // }
}
