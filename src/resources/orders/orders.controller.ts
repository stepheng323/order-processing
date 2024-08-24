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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { paginateDto } from '../dto/paginate.dto';
import { convertResponse } from '../../utils/response';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Res() response: Response,
  ) {
    const result = await this.ordersService.create(createOrderDto);
    return convertResponse(response, result);
  }
  @Post()
  async processOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Res() response: Response,
  ) {
    const result = await this.ordersService.create(createOrderDto);
    return convertResponse(response, result);
  }

  @Get()
  async findAll(@Query() query: paginateDto, @Res() response: Response) {
    const result = await this.ordersService.findAll(query);
    return convertResponse(response, result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const result = await this.ordersService.findOne(id);
    return convertResponse(response, result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res() response: Response,
  ) {
    const result = await this.ordersService.update(id, updateOrderDto);
    return convertResponse(response, result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.ordersService.remove(id);
    return convertResponse(response, result);
  }
}
