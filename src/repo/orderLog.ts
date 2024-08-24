import { Injectable } from '@nestjs/common';
import { OrderLog } from '../lib/database';
import { paginateDto } from '../resources/dto/paginate.dto';
import { getPaginationMetadata } from '../utils/pagination';
import { PaginationMetaData } from '../types';

@Injectable()
export class OrderLogRepo {
  constructor() {}

  async getAllOrderLogs(
    query: paginateDto,
  ): Promise<{ meta: PaginationMetaData; results: OrderLog[] }> {
    const { page = 1, perPage = 10 } = query;
    const { total, results } = await OrderLog.query().page(page - 1, perPage);

    const meta = getPaginationMetadata({
      perPage,
      total,
      page,
    });
    return { meta, results };
  }

  async getOrderLogById(id: string): Promise<OrderLog> {
    return OrderLog.query().findById(id);
  }

  async createOrderLog(data: Partial<OrderLog>): Promise<OrderLog> {
    return OrderLog.query().insert(data).insertAndFetch();
  }

  async updateOrderLog(id: string, data: Partial<OrderLog>): Promise<OrderLog> {
    return OrderLog.query().patchAndFetchById(id, data);
  }

  async deleteOrderLog(id: string): Promise<number> {
    return OrderLog.query().deleteById(id);
  }
}
