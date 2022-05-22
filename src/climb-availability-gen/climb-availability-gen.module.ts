import { Module } from '@nestjs/common';
import { ClimbAvailabilityGenService } from './climb-availability-gen.service';
import { ClimbAvailabilityGenController } from './climb-availability-gen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbAvailabilityGen } from './entities/climb-availability-gen.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClimbAvailabilityGen]), UserModule],
  exports: [ClimbAvailabilityGenService],
  controllers: [ClimbAvailabilityGenController],
  providers: [ClimbAvailabilityGenService],
})
export class ClimbAvailabilityGenModule {}
