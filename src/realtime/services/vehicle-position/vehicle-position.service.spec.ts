import { Test, TestingModule } from '@nestjs/testing';
import { VehiclePositionService } from './vehicle-position.service';

describe('VehiclePositionService', () => {
  let service: VehiclePositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclePositionService],
    }).compile();

    service = module.get<VehiclePositionService>(VehiclePositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
