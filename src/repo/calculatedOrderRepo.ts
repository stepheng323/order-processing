import { Injectable } from '@nestjs/common';
import { CalculatedOrder } from '../lib/database';
import { paginateDto } from '../resources/dto/paginate.dto';
import { getPaginationMetadata } from '../utils/pagination';
import { PaginationMetaData } from '../types';
import { CreateCalculatedOrderDto } from '../resources/calculated-orders/dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from '../resources/calculated-orders/dto/update-calculated-order.dto';

@Injectable()
export class CalculatedOrderRepo {
  constructor() {}

  async getAllCalculatedOrders(
    query: paginateDto,
  ): Promise<{ meta: PaginationMetaData; results: CalculatedOrder[] }> {
    const { page = 1, perPage = 10 } = query;
    const { total, results } = await CalculatedOrder.query().page(
      page - 1,
      perPage,
    );

    const meta = getPaginationMetadata({
      perPage,
      total,
      page,
    });

    return { meta, results };
  }

  async geCalculatedOrderById(id: string) {
    return CalculatedOrder.relatedQuery('addons').where('id', '=', id);
  }

  async createCalculatedOrder(data: CreateCalculatedOrderDto) {
    return CalculatedOrder.query().insert(data).insertAndFetch();
  }

  async updateCalculatedOrder(
    id: string,
    data: UpdateCalculatedOrderDto,
  ): Promise<CalculatedOrder> {
    return CalculatedOrder.query().patchAndFetchById(id, data);
  }
  async deleteCalculatedOrder(id: string): Promise<number> {
    return CalculatedOrder.query().deleteById(id);
  }
}
