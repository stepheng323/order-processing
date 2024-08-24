import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { IServiceHelper } from '../../types';
import { MealRepo } from '../../repo/mealRepo';
import { paginateDto } from '../dto/paginate.dto';

@Injectable()
export class MealsService {
  constructor(private mealRepository: MealRepo) {}
  async create(createMealDto: CreateMealDto): Promise<IServiceHelper> {
    const meal = await this.mealRepository.createMeal(createMealDto);
    return {
      status: 'created',
      message: 'Meals created',
      data: meal,
    };
  }

  async findAll(query: paginateDto): Promise<IServiceHelper> {
    const meals = await this.mealRepository.getAllMeals(query);
    return {
      status: 'successful',
      message: 'All meals fetched successfully',
      data: meals,
    };
  }

  async findOne(id: string): Promise<IServiceHelper> {
    const meal = await this.mealRepository.getMealById(id);
    return {
      status: 'successful',
      message: 'Meal fetched successfully',
      data: meal,
    };
  }

  async update(
    id: string,
    updateMealDto: UpdateMealDto,
  ): Promise<IServiceHelper> {
    await this.mealRepository.updateMeal(id, updateMealDto);
    return {
      status: 'successful',
      message: 'Update Meal successfully',
      data: updateMealDto,
    };
  }

  async remove(id: string): Promise<IServiceHelper> {
    await this.mealRepository.deleteMeal(id);
    return {
      status: 'deleted',
      message: 'Meals deleted successfully',
    };
  }
}
