import { Injectable } from '@nestjs/common';
import { OrderType } from '../lib/database';
import { paginateDto } from '../resources/dto/paginate.dto';
import { getPaginationMetadata } from '../utils/pagination';
import { PaginationMetaData } from '../types';

@Injectable()
export class OrderTypeRepo {
  constructor() {}

  async getAllOrderType(
    query: paginateDto,
  ): Promise<{ meta: PaginationMetaData; results: OrderType[] }> {
    const { page = 1, perPage = 10 } = query;
    const { total, results } = await OrderType.query().page(page - 1, perPage);

    const meta = getPaginationMetadata({
      perPage,
      total,
      page,
    });

    return { meta, results };
  }

  async getOrderTypeById(id: string): Promise<OrderType> {
    return OrderType.query().findById(id);
  }

  async createOrderType(data: Partial<OrderType>): Promise<OrderType> {
    return OrderType.query().insert(data).insertAndFetch();
  }

  async updateOrderType(
    id: string,
    data: Partial<OrderType>,
  ): Promise<OrderType> {
    return OrderType.query().patchAndFetchById(id, data);
  }

  async deleteOrderType(id: string): Promise<number> {
    return OrderType.query().deleteById(id);
  }
}
