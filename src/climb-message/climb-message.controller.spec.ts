import { Test, TestingModule } from '@nestjs/testing';
import { ClimbMessageController } from './climb-message.controller';
import { ClimbMessageService } from './climb-message.service';

describe('ClimbMessageController', () => {
  let controller: ClimbMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimbMessageController],
      providers: [ClimbMessageService],
    }).compile();

    controller = module.get<ClimbMessageController>(ClimbMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
