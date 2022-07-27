import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateClimbAvailabilityGenDto } from './dto/create-climb-availability-gen.dto';
import { UpdateClimbAvailabilityGenDto } from './dto/update-climb-availability-gen.dto';
import { ClimbAvailabilityGen } from './entities/climb-availability-gen.entity';

@Injectable()
export class ClimbAvailabilityGenService {
  constructor(
    @InjectRepository(ClimbAvailabilityGen)
    private climbAvailabilityGenRepository: Repository<ClimbAvailabilityGen>,
  ) {}
  create(
    createClimbAvailabilityGenDto: CreateClimbAvailabilityGenDto,
    user: User,
  ) {
    return this.climbAvailabilityGenRepository.save({
      ...createClimbAvailabilityGenDto,
      areas: JSON.stringify(createClimbAvailabilityGenDto.areas),
      user,
    });
  }

  // findAll() {
  //   return `This action returns all climbAvailabilityGen`;
  // }

  findOne(id: string) {
    return this.climbAvailabilityGenRepository.findOne(id);
  }

  async update(
    id: string,
    updateClimbAvailabilityGenDto: UpdateClimbAvailabilityGenDto,
  ) {
    const oldItem = await this.climbAvailabilityGenRepository.findOne(id);
    if (updateClimbAvailabilityGenDto.areas) {
      oldItem.areas = JSON.stringify(updateClimbAvailabilityGenDto.areas);
    }
    return this.climbAvailabilityGenRepository.save({
      ...updateClimbAvailabilityGenDto,
      areas: oldItem.areas,
      id,
    });
  }

  async remove(id: string) {
    const item = await this.climbAvailabilityGenRepository.findOne(id);
    if (item) {
      return this.climbAvailabilityGenRepository.softRemove(item);
    }
    return HttpStatus.NOT_FOUND;
  }
}
