import { PartialType } from '@nestjs/mapped-types';
import { CreateClimbRequestDto } from './create-climb-request.dto';

export class UpdateClimbRequestDto extends PartialType(CreateClimbRequestDto) {}
