import { Test, TestingModule } from '@nestjs/testing';
import { FeedManagerFactoryService } from './feed-manager-factory.service';

describe('FeedManagerFactoryService', () => {
  let service: FeedManagerFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedManagerFactoryService],
    }).compile();

    service = module.get<FeedManagerFactoryService>(FeedManagerFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
