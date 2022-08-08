import { Test, TestingModule } from '@nestjs/testing';
import { ClimbAvailabilityScheduledService } from './climb-availability-scheduled.service';

describe('ClimbAvailabilityScheduledService', () => {
  let service: ClimbAvailabilityScheduledService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimbAvailabilityScheduledService],
    }).compile();

    service = module.get<ClimbAvailabilityScheduledService>(ClimbAvailabilityScheduledService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
