import { Test, TestingModule } from '@nestjs/testing';
import { ClimbAvailabilityGenController } from './climb-availability-gen.controller';
import { ClimbAvailabilityGenService } from './climb-availability-gen.service';

describe('ClimbAvailabilityGenController', () => {
  let controller: ClimbAvailabilityGenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimbAvailabilityGenController],
      providers: [ClimbAvailabilityGenService],
    }).compile();

    controller = module.get<ClimbAvailabilityGenController>(ClimbAvailabilityGenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
