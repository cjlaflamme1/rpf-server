import { Module } from '@nestjs/common';
import { ClimbMessageService } from './climb-message.service';
import { ClimbMessageController } from './climb-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbMessage } from './entities/climb-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClimbMessage])],
  exports: [ClimbMessageService],
  controllers: [ClimbMessageController],
  providers: [ClimbMessageService],
})
export class ClimbMessageModule {}
