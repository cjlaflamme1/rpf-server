import { Test, TestingModule } from '@nestjs/testing';
import { ClimberProfileController } from './climber-profile.controller';
import { ClimberProfileService } from './climber-profile.service';

describe('ClimberProfileController', () => {
  let controller: ClimberProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimberProfileController],
      providers: [ClimberProfileService],
    }).compile();

    controller = module.get<ClimberProfileController>(ClimberProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
