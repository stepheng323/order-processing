import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { convertResponse } from '../../utils/response';
import { paginateDto } from '../dto/paginate.dto';
import { Response } from 'express';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  async create(
    @Body() createMealDto: CreateMealDto,
    @Res() response: Response,
  ) {
    const result = await this.mealsService.create(createMealDto);
    return convertResponse(response, result);
  }

  @Get()
  async findAll(@Query() query: paginateDto, @Res() response: Response) {
    const result = await this.mealsService.findAll(query);
    return convertResponse(response, result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const result = await this.mealsService.findOne(id);
    return convertResponse(response, result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealDto,
    @Res() response: Response,
  ) {
    const result = await this.mealsService.update(id, updateMealDto);
    return convertResponse(response, result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.mealsService.remove(id);
    return convertResponse(response, result);
  }
}
