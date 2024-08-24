import { Injectable } from '@nestjs/common';
import { CalculatedOrderMeal, Order } from '../lib/database';
import { paginateDto } from '../resources/dto/paginate.dto';
import { getPaginationMetadata } from '../utils/pagination';
import { PaginationMetaData } from '../types';

@Injectable()
export class OrderRepo {
  constructor() {}

  async getAllOrder(
    query: paginateDto,
  ): Promise<{ meta: PaginationMetaData; results: Order[] }> {
    const { page = 1, perPage = 10 } = query;
    const { total, results } = await Order.query().page(page - 1, perPage);

    const meta = getPaginationMetadata({
      perPage,
      total,
      page,
    });
    return { meta, results };
  }

  async getOrderById(id: string): Promise<Order> {
    return Order.query().findById(id);
  }

  async getOrderAndCalculatedOrder(id: string) {
    return Order.query()
      .findById(id)
      .withGraphFetched('calculatedOrder.[meals.[addons]]');
  }

  async createOrder({
    data,
    calculatedOrder,
  }: {
    data: Partial<Order>;
    calculatedOrder: any;
  }): Promise<Order> {
    return Order.transaction(async (trx) => {
      const order = await Order.query(trx).insertGraphAndFetch({
        ...data,
        calculatedOrder,
      });
      await CalculatedOrderMeal.query(trx).insert({
        calculated_order_id: order.calculated_order_id,
        meal_id: data.id,
      });
      return order;
    });
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    return Order.query().patchAndFetchById(id, data);
  }

  async deleteOrder(id: string): Promise<number> {
    return Order.query().deleteById(id);
  }
}
