import { Injectable } from '@nestjs/common';
import { CreateClimberProfileDto } from './dto/create-climber-profile.dto';
import { UpdateClimberProfileDto } from './dto/update-climber-profile.dto';

@Injectable()
export class ClimberProfileService {
  create(createClimberProfileDto: CreateClimberProfileDto) {
    return 'This action adds a new climberProfile';
  }

  findAll() {
    return `This action returns all climberProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} climberProfile`;
  }

  update(id: number, updateClimberProfileDto: UpdateClimberProfileDto) {
    return `This action updates a #${id} climberProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} climberProfile`;
  }
}
