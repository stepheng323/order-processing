import { Model } from 'objection';
import { Order } from './order';
import BaseModel from './_baseModel';

export class OrderType extends BaseModel {
  static tableName = 'order_types';

  name: string;
  orders: Order[];

  static get relationMappings() {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: Order,
        join: {
          from: 'order_types.id',
          to: 'orders.order_type_id',
        },
      },
    };
  }
}
