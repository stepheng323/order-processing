import BaseModel from './_baseModel';
import { Model } from 'objection';
import { Meal } from './meal';
import { CalculatedOrder } from './calculatedOrder';

export class CalculatedOrderMeal extends BaseModel {
  static tableName = 'calculated_order_meals';

  meal_id: string;
  calculated_order_id: string;
  meal: Meal;
  calculated_order: CalculatedOrder;

  static get relationMappings() {
    return {
      meal: {
        relation: Model.BelongsToOneRelation,
        modelClass: Meal,
        join: {
          from: 'calculated_order_meal.meal_id',
          to: 'meals.id',
        },
      },
      calculated_order: {
        relation: Model.BelongsToOneRelation,
        modelClass: CalculatedOrder,
        join: {
          from: 'calculated_order_meal.calculated_order_id',
          to: 'calculated_order.id',
        },
      },
    };
  }
}
