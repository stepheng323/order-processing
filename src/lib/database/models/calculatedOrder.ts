import { Model } from 'objection';
import { Order } from './order';
import { Meal } from './meal';
import BaseModel from './_baseModel';

export class CalculatedOrder extends BaseModel {
  static tableName = 'calculated_orders';

  user_id: string;
  order_id: string;
  total_amount: number;
  free_delivery: boolean;
  delivery_fee: number;
  service_charge: number;
  lat: string;
  lng: string;
  cokitchen_polygon_id: string;
  cokitchen_id: string;
  pickup: boolean;
  prev_price: number;
  address_details: {
    address_line: string;
    building_number: string;
    city: string;
    name: string;
  };
  Order: Order;
  meals: Meal[];

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'calculated_orders.id',
          to: 'orders.calculated_order_id',
        },
      },
      meals: {
        relation: Model.ManyToManyRelation,
        modelClass: Meal,
        join: {
          from: 'calculated_orders.id',
          through: {
            from: 'calculated_order_meals.calculated_order_id',
            to: 'calculated_order_meals.meal_id',
          },
          to: 'meals.id',
        },
      },
    };
  }
}
