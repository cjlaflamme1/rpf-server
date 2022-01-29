import { Test, TestingModule } from '@nestjs/testing';
import { ClimberProfileService } from './climber-profile.service';

describe('ClimberProfileService', () => {
  let service: ClimberProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimberProfileService],
    }).compile();

    service = module.get<ClimberProfileService>(ClimberProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
