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
import { OrderTypesService } from './order-types.service';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { convertResponse } from '../../utils/response';
import { paginateDto } from '../dto/paginate.dto';
import { Response } from 'express';

@Controller('order-types')
export class OrderTypesController {
  constructor(private readonly orderTypesService: OrderTypesService) {}

  @Post()
  async create(
    @Body() createOrderTypeDto: CreateOrderTypeDto,
    @Res() response: Response,
  ) {
    const result = await this.orderTypesService.create(createOrderTypeDto);
    return convertResponse(response, result);
  }

  @Get()
  async findAll(@Query() query: paginateDto, @Res() response: Response) {
    const result = await this.orderTypesService.findAll(query);
    return convertResponse(response, result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const result = await this.orderTypesService.findOne(id);
    return convertResponse(response, result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderTypeDto: UpdateOrderTypeDto,
    @Res() response: Response,
  ) {
    const result = await this.orderTypesService.update(id, updateOrderTypeDto);
    return convertResponse(response, result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.orderTypesService.remove(id);
    return convertResponse(response, result);
  }
}
