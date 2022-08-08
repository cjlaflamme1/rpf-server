import { Test, TestingModule } from '@nestjs/testing';
import { ClimbAvailabilityGenService } from './climb-availability-gen.service';

describe('ClimbAvailabilityGenService', () => {
  let service: ClimbAvailabilityGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimbAvailabilityGenService],
    }).compile();

    service = module.get<ClimbAvailabilityGenService>(ClimbAvailabilityGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
