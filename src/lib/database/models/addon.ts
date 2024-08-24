import BaseModel from './_baseModel';
import { Model } from 'objection';
import { Meal } from './meal';

export class Addon extends BaseModel {
  static tableName = 'addons';

  meal_id: string;
  name: string;
  amount: number;
  is_combo: boolean;
  is_active: boolean;
  position: number;
  quantity: number;
  internal_profit: number;
  min_selection_no: string;
  meal_addon_category_id: string;
  meal: Meal;

  static get relationMappings() {
    return {
      meal: {
        relation: Model.BelongsToOneRelation,
        modelClass: Meal,
        join: {
          from: 'addons.meal_id',
          to: 'meals.id',
        },
      },
    };
  }
}
