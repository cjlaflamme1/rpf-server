import { Module } from '@nestjs/common';
import { ClimbRequestService } from './climb-request.service';
import { ClimbRequestController } from './climb-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbRequest } from './entities/climb-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClimbRequest])],
  exports: [ClimbRequestService],
  controllers: [ClimbRequestController],
  providers: [ClimbRequestService],
})
export class ClimbRequestModule {}
