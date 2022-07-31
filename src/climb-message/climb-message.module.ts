import { Module } from '@nestjs/common';
import { ClimbMessageService } from './climb-message.service';
import { ClimbMessageController } from './climb-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbMessage } from './entities/climb-message.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClimbMessage]), UserModule],
  exports: [ClimbMessageService],
  controllers: [ClimbMessageController],
  providers: [ClimbMessageService],
})
export class ClimbMessageModule {}
