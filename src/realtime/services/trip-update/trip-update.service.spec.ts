import { Test, TestingModule } from '@nestjs/testing';
import { TripUpdateService } from './trip-update.service';

describe('TripUpdateService', () => {
  let service: TripUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripUpdateService],
    }).compile();

    service = module.get<TripUpdateService>(TripUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
