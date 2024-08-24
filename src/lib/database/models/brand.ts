import BaseModel from './_baseModel';
import { Meal } from './meal';
import { Model } from 'objection';

export class Brand extends BaseModel {
  static tableName = 'brands';
  name: string;
  meals: Meal[]

  static get relationMappings() {
    return {
      meals: {
        relation: Model.HasManyRelation,
        modelClass: Meal,
        join: {
          from: 'brands.id',
          to: 'meals.brand_id',
        },
      },
    };
  }
}
