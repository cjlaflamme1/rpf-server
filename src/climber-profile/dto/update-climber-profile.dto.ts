import { PartialType } from '@nestjs/mapped-types';
import { CreateClimberProfileDto } from './create-climber-profile.dto';

export class UpdateClimberProfileDto extends PartialType(CreateClimberProfileDto) {}
