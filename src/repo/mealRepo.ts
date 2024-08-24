import { Injectable } from '@nestjs/common';
import { Meal } from '../lib/database';
import { paginateDto } from '../resources/dto/paginate.dto';
import { getPaginationMetadata } from '../utils/pagination';
import { PaginationMetaData } from '../types';
import { CreateMealDto } from '../resources/meals/dto/create-meal.dto';
import { UpdateMealDto } from '../resources/meals/dto/update-meal.dto';

@Injectable()
export class MealRepo {
  constructor() {}

  async getAllMeals(
    query: paginateDto,
  ): Promise<{ meta: PaginationMetaData; results: Meal[] }> {
    const { page = 1, perPage = 10 } = query;
    const { total, results } = await Meal.query().page(page - 1, perPage);

    const meta = getPaginationMetadata({
      perPage,
      total,
      page,
    });

    return { meta, results };
  }

  async getMealById(id: string) {
    return Meal.relatedQuery('addons').where('id', '=', id);
  }

  async createMeal(data: CreateMealDto) {
    return Meal.transaction(async (trx) => {
      return Meal.query(trx).insert(data);
    });
  }

  async updateMeal(id: string, data: UpdateMealDto): Promise<Meal> {
    return Meal.query().patchAndFetchById(id, data);
  }
  async deleteMeal(id: string): Promise<number> {
    return Meal.query().deleteById(id);
  }
}
