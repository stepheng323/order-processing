import { Model } from 'objection';
import { Order } from './order';
import BaseModel from './_baseModel';

export class OrderLog extends BaseModel {
  static tableName = 'order_logs';

  order_id: string;
  time: string;
  description: string;
  order: Order;

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_logs.order_id',
          to: 'orders.id',
        },
      },
    };
  }
}
