import { Module } from '@nestjs/common';
import { ClimberProfileService } from './climber-profile.service';
import { ClimberProfileController } from './climber-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimberProfile } from './entities/climber-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClimberProfile])],
  exports: [ClimberProfileService],
  controllers: [ClimberProfileController],
  providers: [ClimberProfileService],
})
export class ClimberProfileModule {}
