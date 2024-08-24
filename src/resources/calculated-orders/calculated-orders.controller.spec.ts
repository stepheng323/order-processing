import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedOrdersController } from './calculated-orders.controller';
import { CalculatedOrdersService } from './calculated-orders.service';

describe('CalculatedOrdersController', () => {
  let controller: CalculatedOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatedOrdersController],
      providers: [CalculatedOrdersService],
    }).compile();

    controller = module.get<CalculatedOrdersController>(
      CalculatedOrdersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
