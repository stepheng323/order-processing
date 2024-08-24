import { Module } from '@nestjs/common';
import { OrderLogsService } from './order-logs.service';
import { OrderLogsController } from './order-logs.controller';
import { OrderLogRepo } from '../../repo/orderLog';

@Module({
  controllers: [OrderLogsController],
  providers: [OrderLogsService],
})
export class OrderLogsModule {}
