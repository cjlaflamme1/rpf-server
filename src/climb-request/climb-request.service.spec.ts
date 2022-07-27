import { Test, TestingModule } from '@nestjs/testing';
import { ClimbRequestService } from './climb-request.service';

describe('ClimbRequestService', () => {
  let service: ClimbRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimbRequestService],
    }).compile();

    service = module.get<ClimbRequestService>(ClimbRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
