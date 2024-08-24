import { Injectable } from '@nestjs/common';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';
import { IServiceHelper } from '../../types';
import { CalculatedOrderRepo } from '../../repo/calculatedOrderRepo';
import { paginateDto } from '../dto/paginate.dto';

@Injectable()
export class CalculatedOrdersService {
  constructor(private calculateOrderRepo: CalculatedOrderRepo) {}
  async create(
    createCalculatedOrderDto: CreateCalculatedOrderDto,
  ): Promise<IServiceHelper> {
    const calculatedOrder = await this.calculateOrderRepo.createCalculatedOrder(
      createCalculatedOrderDto,
    );
    return {
      status: 'created',
      message: 'Calculated order created order log',
      data: calculatedOrder,
    };
  }

  async findAll(query: paginateDto): Promise<IServiceHelper> {
    const calculatedOrders =
      await this.calculateOrderRepo.getAllCalculatedOrders(query);
    return {
      status: 'successful',
      message: 'Calculated Order fetched successfully',
      data: calculatedOrders,
    };
  }

  async findOne(id: string): Promise<IServiceHelper> {
    const calculatedOrder =
      await this.calculateOrderRepo.geCalculatedOrderById(id);
    return {
      status: 'successful',
      message: 'Calculated Order fetched successfully',
      data: calculatedOrder,
    };
  }

  async update(
    id: string,
    updateCalculatedOrderDto: UpdateCalculatedOrderDto,
  ): Promise<IServiceHelper> {
    const updatedCalculatedOrder =
      await this.calculateOrderRepo.updateCalculatedOrder(
        id,
        updateCalculatedOrderDto,
      );
    return {
      status: 'successful',
      message: 'Update calculated order',
      data: updatedCalculatedOrder,
    };
  }

  async remove(id: string): Promise<IServiceHelper> {
    await this.calculateOrderRepo.deleteCalculatedOrder(id);
    return {
      status: 'successful',
      message: 'Order removed successfully',
    };
  }
}
