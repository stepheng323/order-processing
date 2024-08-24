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
import { OrderLogsService } from './order-logs.service';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';
import { convertResponse } from '../../utils/response';
import { paginateDto } from '../dto/paginate.dto';
import { Response } from 'express';

@Controller('order-logs')
export class OrderLogsController {
  constructor(private readonly orderLogsService: OrderLogsService) {}

  @Post()
  async create(
    @Body() createOrderLogDto: CreateOrderLogDto,
    @Res() response: Response,
  ) {
    const result = await this.orderLogsService.create(createOrderLogDto);
    return convertResponse(response, result);
  }

  @Get()
  async findAll(@Query() query: paginateDto, @Res() response: Response) {
    const result = await this.orderLogsService.findAll(query);
    return convertResponse(response, result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const result = await this.orderLogsService.findOne(id);
    return convertResponse(response, result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderLogDto: UpdateOrderLogDto,
    @Res() response: Response,
  ) {
    const result = await this.orderLogsService.update(id, updateOrderLogDto);
    return convertResponse(response, result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.orderLogsService.remove(id);
    return convertResponse(response, result);
  }
}
