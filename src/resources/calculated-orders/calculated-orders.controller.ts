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
import { CalculatedOrdersService } from './calculated-orders.service';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';
import { convertResponse } from '../../utils/response';
import { paginateDto } from '../dto/paginate.dto';
import { Response } from 'express';

@Controller('calculated-orders')
export class CalculatedOrdersController {
  constructor(
    private readonly calculatedOrdersService: CalculatedOrdersService,
  ) {}

  @Post()
  async create(
    @Body() createCalculatedOrderDto: CreateCalculatedOrderDto,
    @Res() response: Response,
  ) {
    const result = await this.calculatedOrdersService.create(
      createCalculatedOrderDto,
    );
    return convertResponse(response, result);
  }

  @Get()
  async findAll(@Query() query: paginateDto, @Res() response: Response) {
    const result = await this.calculatedOrdersService.findAll(query);
    convertResponse(response, result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const result = await this.calculatedOrdersService.findOne(id);
    convertResponse(response, result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCalculatedOrderDto: UpdateCalculatedOrderDto,
    @Res() response: Response,
  ) {
    const result = await this.calculatedOrdersService.update(
      id,
      updateCalculatedOrderDto,
    );
    return convertResponse(response, result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.calculatedOrdersService.remove(id);
    return convertResponse(response, result);
  }
}
