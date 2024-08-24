import { Global, Module } from '@nestjs/common';
import { BrandRepo } from './brandRepo';
import { OrderTypeRepo } from './orderTypeRepo';
import { CalculatedOrderRepo } from './calculatedOrderRepo';
import { MealRepo } from './mealRepo';
import { OrderRepo } from './orderRepo';
import { OrderLogRepo } from './orderLog';

@Global()
@Module({
  providers: [
    BrandRepo,
    OrderTypeRepo,
    CalculatedOrderRepo,
    MealRepo,
    OrderRepo,
    OrderLogRepo,
  ],
  exports: [
    BrandRepo,
    OrderTypeRepo,
    CalculatedOrderRepo,
    MealRepo,
    OrderRepo,
    OrderLogRepo,
  ],
})
export class RepositoriesModule {}
