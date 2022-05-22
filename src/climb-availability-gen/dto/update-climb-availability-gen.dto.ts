import { PartialType } from '@nestjs/mapped-types';
import { CreateClimbAvailabilityGenDto } from './create-climb-availability-gen.dto';

export class UpdateClimbAvailabilityGenDto extends PartialType(
  CreateClimbAvailabilityGenDto,
) {}
