import { Test, TestingModule } from '@nestjs/testing';
import { ClimbMeetupController } from './climb-meetup.controller';
import { ClimbMeetupService } from './climb-meetup.service';

describe('ClimbMeetupController', () => {
  let controller: ClimbMeetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimbMeetupController],
      providers: [ClimbMeetupService],
    }).compile();

    controller = module.get<ClimbMeetupController>(ClimbMeetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
