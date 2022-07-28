import { Test, TestingModule } from '@nestjs/testing';
import { WholemapController } from './wholemap.controller';

describe('WholemapController', () => {
  let controller: WholemapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WholemapController],
    }).compile();

    controller = module.get<WholemapController>(WholemapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
