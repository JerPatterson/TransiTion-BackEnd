import { Test, TestingModule } from '@nestjs/testing';
import { VehiclePositionController } from './vehicle-position.controller';

describe('VehiclePositionController', () => {
  let controller: VehiclePositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclePositionController],
    }).compile();

    controller = module.get<VehiclePositionController>(VehiclePositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
