import { Module } from '@nestjs/common';
import { ClimbAvailabilityScheduledService } from './climb-availability-scheduled.service';
import { ClimbAvailabilityScheduledController } from './climb-availability-scheduled.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbAvailabilityScheduled } from './entities/climb-availability-scheduled.entity';
import { UserModule } from 'src/user/user.module';
import { ClimbAvailabilityGenModule } from 'src/climb-availability-gen/climb-availability-gen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClimbAvailabilityScheduled]),
    UserModule,
    ClimbAvailabilityGenModule,
  ],
  exports: [ClimbAvailabilityScheduledService],
  controllers: [ClimbAvailabilityScheduledController],
  providers: [ClimbAvailabilityScheduledService],
})
export class ClimbAvailabilityScheduledModule {}
