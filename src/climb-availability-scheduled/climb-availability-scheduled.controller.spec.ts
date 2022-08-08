import { Test, TestingModule } from '@nestjs/testing';
import { ClimbAvailabilityScheduledController } from './climb-availability-scheduled.controller';
import { ClimbAvailabilityScheduledService } from './climb-availability-scheduled.service';

describe('ClimbAvailabilityScheduledController', () => {
  let controller: ClimbAvailabilityScheduledController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimbAvailabilityScheduledController],
      providers: [ClimbAvailabilityScheduledService],
    }).compile();

    controller = module.get<ClimbAvailabilityScheduledController>(ClimbAvailabilityScheduledController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
