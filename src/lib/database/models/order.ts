import { Model } from 'objection';
import { OrderLog } from './orderLog';
import { CalculatedOrder } from './calculatedOrder';
import { OrderType } from './orderType';
import BaseModel from './_baseModel';

export class Order extends BaseModel {
  static tableName = 'orders';

  user_id: string;
  completed!: boolean;
  cancelled!: boolean;
  kitchen_cancelled!: boolean;
  kitchen_accepted!: boolean;
  kitchen_dispatched!: boolean;
  kitchen_dispatched_time!: string;
  completed_time!: string;
  rider_id!: string;
  kitchen_prepared!: boolean;
  rider_assigned!: boolean;
  paid!: boolean;
  order_code: string;
  order_change: string;
  calculated_order_id!: string;
  kitchen_verified_time!: string;
  kitchen_completed_time!: string;
  shop_accepted!: boolean;
  shop_prepared!: boolean;
  no_of_mealbags_delivered!: number;
  no_of_drinks_delivered!: number;
  rider_started_time!: string;
  rider_started!: boolean;
  rider_arrived_time!: string;
  rider_arrived!: boolean;
  is_failed_trip!: boolean;
  failed_trip_details!: any;
  box_number!: string;
  shelf_id!: string[];
  scheduled!: boolean;
  confirmed_by_id!: string | null;
  completed_by_id!: string | null;
  scheduled_delivery_date!: Date;
  scheduled_delivery_time!: string;
  is_hidden!: boolean;
  order_type_id: string;
  logs: OrderLog[];
  calculatedOrder: CalculatedOrder;
  orderType: OrderType;

  static get relationMappings() {
    return {
      logs: {
        relation: Model.HasManyRelation,
        modelClass: OrderLog,
        join: {
          from: 'orders.id',
          to: 'order_logs.order_id',
        },
      },
      calculatedOrder: {
        relation: Model.HasOneRelation,
        modelClass: CalculatedOrder,
        join: {
          from: 'orders.calculated_order_id',
          to: 'calculated_orders.id',
        },
      },
      orderType: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderType,
        join: {
          from: 'orders.order_type_id',
          to: 'order_types.id',
        },
      },
    };
  }
}
