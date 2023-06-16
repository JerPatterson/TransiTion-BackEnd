import { Test, TestingModule } from '@nestjs/testing';
import { TripUpdateController } from './trip-update.controller';

describe('TripUpdateController', () => {
  let controller: TripUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripUpdateController],
    }).compile();

    controller = module.get<TripUpdateController>(TripUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
