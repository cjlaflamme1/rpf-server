import { Module } from '@nestjs/common';
import { ClimbRequestService } from './climb-request.service';
import { ClimbRequestController } from './climb-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbRequest } from './entities/climb-request.entity';
import { UserModule } from 'src/user/user.module';
import { ClimbAvailabilityScheduledModule } from 'src/climb-availability-scheduled/climb-availability-scheduled.module';
import { ClimbAvailabilityGenModule } from 'src/climb-availability-gen/climb-availability-gen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClimbRequest]),
    UserModule,
    ClimbAvailabilityScheduledModule,
    ClimbAvailabilityGenModule,
  ],
  exports: [ClimbRequestService],
  controllers: [ClimbRequestController],
  providers: [ClimbRequestService],
})
export class ClimbRequestModule {}
