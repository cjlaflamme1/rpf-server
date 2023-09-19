import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import { Repository } from 'typeorm';
import { CreateClimbMessageDto } from './dto/create-climb-message.dto';
import { UpdateClimbMessageDto } from './dto/update-climb-message.dto';
import { ClimbMessage } from './entities/climb-message.entity';

@Injectable()
export class ClimbMessageService {
  constructor(
    @InjectRepository(ClimbMessage)
    private climbMessageRepository: Repository<ClimbMessage>,
  ) {}
  expo = new Expo();
  logger = new Logger(ClimbMessageService.name);

  create(createClimbMessageDto: CreateClimbMessageDto) {
    if (
      createClimbMessageDto.climbMeetup &&
      createClimbMessageDto.climbMeetup.users
    ) {
      const receivingUsers = createClimbMessageDto.climbMeetup.users.filter(
        (user) => user.id !== createClimbMessageDto.user.id,
      );
      if (receivingUsers) {
        const messages: ExpoPushMessage[] = [];
        receivingUsers.map((user) => {
          if (user.expoPushToken) {
            messages.push({
              to: user.expoPushToken,
              title: 'New Message',
              body: `You have a new Message from ${createClimbMessageDto.user.firstName}`,
              sound: 'default',
            });
          }
        });
        if (messages.length > 0) {
          this.expo
            .sendPushNotificationsAsync(messages)
            .catch((e) => this.logger.log(e));
        }
      }
    }
    return this.climbMessageRepository.save(createClimbMessageDto);
  }

  // findAll() {
  //   return `This action returns all climbMessage`;
  // }

  // findOne(id: string, relations: string[] = []) {
  //   return this.climbMessageRepository.findOne(id, { relations });
  // }

  update(id: string, updateClimbMessageDto: UpdateClimbMessageDto) {
    return this.climbMessageRepository.save({
      id,
      ...updateClimbMessageDto,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} climbMessage`;
  // }
}
