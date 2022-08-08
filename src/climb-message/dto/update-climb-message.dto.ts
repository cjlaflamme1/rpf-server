import { PartialType } from '@nestjs/mapped-types';
import { CreateClimbMessageDto } from './create-climb-message.dto';

export class UpdateClimbMessageDto extends PartialType(CreateClimbMessageDto) {}
