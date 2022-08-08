import { Test, TestingModule } from '@nestjs/testing';
import { ClimbMessageService } from './climb-message.service';

describe('ClimbMessageService', () => {
  let service: ClimbMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimbMessageService],
    }).compile();

    service = module.get<ClimbMessageService>(ClimbMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
