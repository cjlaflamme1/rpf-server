import { Test, TestingModule } from '@nestjs/testing';
import { ClimbMeetupService } from './climb-meetup.service';

describe('ClimbMeetupService', () => {
  let service: ClimbMeetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimbMeetupService],
    }).compile();

    service = module.get<ClimbMeetupService>(ClimbMeetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
