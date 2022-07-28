import { Test, TestingModule } from '@nestjs/testing';
import { WholemapService } from './wholemap.service';

describe('WholemapService', () => {
  let service: WholemapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WholemapService],
    }).compile();

    service = module.get<WholemapService>(WholemapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
