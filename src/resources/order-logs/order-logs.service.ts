import { Injectable } from '@nestjs/common';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';
import { IServiceHelper } from '../../types';
import { OrderLogRepo } from '../../repo/orderLog';
import { paginateDto } from '../dto/paginate.dto';

@Injectable()
export class OrderLogsService {
  constructor(private orderLogRepository: OrderLogRepo) {}
  async create(createOrderLogDto: CreateOrderLogDto): Promise<IServiceHelper> {
    const data =
      await this.orderLogRepository.createOrderLog(createOrderLogDto);
    return {
      status: 'created',
      message: 'Order logs created',
      data,
    };
  }

  async findAll(query: paginateDto): Promise<IServiceHelper> {
    const orderLogs = await this.orderLogRepository.getAllOrderLogs(query);
    return {
      status: 'successful',
      message: 'Order logs fetched successfully',
      data: orderLogs,
    };
  }

  async findOne(id: string): Promise<IServiceHelper> {
    const orderLog = await this.orderLogRepository.getOrderLogById(id);
    return {
      status: 'successful',
      message: 'Order fetched successfully',
      data: orderLog,
    };
  }

  async update(
    id: string,
    updateOrderLogDto: UpdateOrderLogDto,
  ): Promise<IServiceHelper> {
    const orderLog = await this.orderLogRepository.updateOrderLog(
      id,
      updateOrderLogDto,
    );
    return {
      status: 'successful',
      message: 'Order log updated fetched successfully',
      data: orderLog,
    };
  }

  async remove(id: string): Promise<IServiceHelper> {
    await this.orderLogRepository.deleteOrderLog(id);
    return {
      status: 'deleted',
      message: 'Order logs removed successfully',
    };
  }
}
