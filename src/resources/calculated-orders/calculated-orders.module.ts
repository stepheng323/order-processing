import { Module } from '@nestjs/common';
import { CalculatedOrdersService } from './calculated-orders.service';
import { CalculatedOrdersController } from './calculated-orders.controller';

@Module({
  controllers: [CalculatedOrdersController],
  providers: [CalculatedOrdersService],
})
export class CalculatedOrdersModule {}
