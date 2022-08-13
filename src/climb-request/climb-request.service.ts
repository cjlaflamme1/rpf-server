import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
  logger = new Logger(ClimbRequestService.name);
  async create(createClimbRequestDto: CreateClimbRequestDto) {
    if (createClimbRequestDto.targetScheduledRequest) {
      const existingReq = await this.climbRequestRepository.find({
        where: {
          initiatingEntry: createClimbRequestDto.initiatingEntry,
          targetScheduledRequest: createClimbRequestDto.targetScheduledRequest,
        },
      });
      if (existingReq && existingReq.length > 0) {
        throw new HttpException(
          'This match request already exists.',
          HttpStatus.CONFLICT,
        );
      }
    }
    if (createClimbRequestDto.targetGenRequest) {
      if (createClimbRequestDto.targetScheduledRequest) {
        const existingReq = await this.climbRequestRepository.find({
          where: {
            initiatingEntry: createClimbRequestDto.initiatingEntry,
            targetGenRequest: createClimbRequestDto.targetGenRequest,
          },
        });
        if (existingReq && existingReq.length > 0) {
          throw new HttpException(
            'This match request already exists.',
            HttpStatus.CONFLICT,
          );
        }
      }
    }
    return this.climbRequestRepository.save(createClimbRequestDto);
  }

  // findAll() {
  //   return `This action returns all climbRequest`;
  // }

  findOne(id: string, relations: string[] = []) {
    return this.climbRequestRepository.findOne(id, { relations });
  }

  async update(id: string, updateClimbRequestDto: UpdateClimbRequestDto) {
    const climbreq = await this.climbRequestRepository.save({
      id,
      ...updateClimbRequestDto,
    });
    return this.findOne(climbreq.id, [
      'targetGenRequest',
      'targetScheduledRequest',
      'initiatingUser',
      'initiatingEntry',
      'targetUser',
    ]);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} climbRequest`;
  // }
}
