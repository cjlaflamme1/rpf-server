import { Test, TestingModule } from '@nestjs/testing';
import { ClimbRequestController } from './climb-request.controller';
import { ClimbRequestService } from './climb-request.service';

describe('ClimbRequestController', () => {
  let controller: ClimbRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimbRequestController],
      providers: [ClimbRequestService],
    }).compile();

    controller = module.get<ClimbRequestController>(ClimbRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
