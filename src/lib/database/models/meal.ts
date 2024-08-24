import { Model } from 'objection';
import { Brand } from './brand';
import { Addon } from './addon';
import BaseModel from './_baseModel';

export class Meal extends BaseModel {
  static tableName = 'meals';

  name: string;
  amount: number;
  new: boolean;
  active: boolean;
  brand_id: string;
  is_addon: boolean;
  is_combo: boolean;
  quantity: number;
  item_type: string;
  description: string;
  calories: string;
  available_no: string;
  order_note: string;
  internal_profit: number;
  meal_category_id: string;
  addons: Addon[];
  brand: Brand;

  static get relationMappings() {
    return {
      addons: {
        relation: Model.HasManyRelation,
        modelClass: Addon,
        join: {
          from: 'meals.id',
          to: 'addons.meal_id',
        },
      },
      brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'meals.brand_id',
          to: 'brands.id',
        },
      },
    };
  }
}
