import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './resources/orders/orders.module';
import { BrandModule } from './resources/brands/brandModule';
import { OrderTypesModule } from './resources/order-types/order-types.module';
import { MealsModule } from './resources/meals/meals.module';
import { AddonsModule } from './resources/addons/addons.module';
import { OrderLogsModule } from './resources/order-logs/order-logs.module';
import { CalculatedOrdersModule } from './resources/calculated-orders/calculated-orders.module';
import { RepositoriesModule } from './repo/repo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BrandModule,
    OrdersModule,
    OrderTypesModule,
    MealsModule,
    AddonsModule,
    OrderLogsModule,
    CalculatedOrdersModule,
    RepositoriesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
