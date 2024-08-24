import { Injectable } from '@nestjs/common';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { IServiceHelper } from '../../types';
import { OrderTypeRepo } from '../../repo/orderTypeRepo';
import { paginateDto } from '../dto/paginate.dto';

@Injectable()
export class OrderTypesService {
  constructor(private orderTypeRepository: OrderTypeRepo) {}
  async create(
    createOrderTypeDto: CreateOrderTypeDto,
  ): Promise<IServiceHelper> {
    const orderType =
      await this.orderTypeRepository.createOrderType(createOrderTypeDto);
    return {
      status: 'created',
      message: 'Order type created successfully',
      data: orderType,
    };
  }

  async findAll(query: paginateDto): Promise<IServiceHelper> {
    const orderTypes = await this.orderTypeRepository.getAllOrderType(query);
    return {
      status: 'successful',
      message: 'Order types fetched successfully',
      data: orderTypes,
    };
  }

  async findOne(id: string): Promise<IServiceHelper> {
    const orderType = await this.orderTypeRepository.getOrderTypeById(id);
    return {
      status: 'successful',
      message: 'Order type fetched successfully',
      data: orderType,
    };
  }

  async update(
    id: string,
    updateOrderTypeDto: UpdateOrderTypeDto,
  ): Promise<IServiceHelper> {
    const updatedOderType = await this.orderTypeRepository.updateOrderType(
      id,
      updateOrderTypeDto,
    );
    return {
      status: 'successful',
      message: 'Updated successfully',
      data: updatedOderType,
    };
  }

  async remove(id: string): Promise<IServiceHelper> {
    await this.orderTypeRepository.deleteOrderType(id);
    return {
      status: 'successful',
      message: 'Order type removed successfully',
    }
  }
}
