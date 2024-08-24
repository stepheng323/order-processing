import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IServiceHelper } from '../../types';
import { OrderRepo } from '../../repo/orderRepo';
import { paginateDto } from '../dto/paginate.dto';
import { OrderLogRepo } from '../../repo/orderLog';
import { CalculatedOrder } from '../../lib/database';
import { OrderGateway } from '../../lib/websocketGateway';
import { CalculatedOrderRepo } from '../../repo/calculatedOrderRepo';
@Injectable()
export class OrdersService {
  constructor(
    private orderRepo: OrderRepo,
    private orderLog: OrderLogRepo,
    private calculatedOrder: CalculatedOrderRepo,
    private orderGateway: OrderGateway,
  ) {}

  calculateOrder() {
    // this data should be computed from various sources like meal info, for meal price, delivery fee etc.
    //  hard coding this here
    return {
      id: '1',
      free_delivery: false,
      delivery_fee: '900',
      service_charge: '0',
      lat: '6.453235649711961',
      lng: '3.542877760780109',
      cokitchen_polygon_id: 's2',
      user_id: '2',
      cokitchen_id: '3',
      pickup: false,
      prev_price: '15030',
    };
  }

  calculateTotalOrderAmount(calculatedOrder: CalculatedOrder): number {
    let totalAmount = 0;

    if (calculatedOrder) {
      for (const meal of calculatedOrder.meals) {
        totalAmount += meal.amount;

        for (const addon of meal.addons) {
          totalAmount += addon.amount;
        }
      }
      totalAmount += calculatedOrder.delivery_fee || 0;
      totalAmount += calculatedOrder.service_charge || 0;
    }

    return totalAmount;
  }

  async create(createOrderDto: CreateOrderDto): Promise<IServiceHelper> {
    const calculatedOrderData = this.calculateOrder();

    const order = await this.orderRepo.createOrder({
      data: createOrderDto,
      calculatedOrder: calculatedOrderData,
    });

    return {
      status: 'created',
      message: 'Order created successfully',
      data: order,
    };
  }

  async processOrder(id: string): Promise<IServiceHelper> {
    const order = await this.orderRepo.getOrderAndCalculatedOrder(id);
    if (!order || order.cancelled || order.completed) {
      return {
        status: 'forbidden',
        message:
          'This order can not be processed, it either completed or does not exist',
      };
    }

    if (!order.kitchen_accepted) {
      await this.orderRepo.updateOrder(order.id, { kitchen_accepted: true });
      const description = 'Order accepted by kitchen';
      await this.orderLog.createOrderLog({
        time: new Date().getTime().toString(),
        description,
      });
      this.orderGateway.pushOrderUpdate(order.id, description);
    }

    if (order.kitchen_prepared && !order.kitchen_dispatched) {
      await this.orderRepo.updateOrder(order.id, { kitchen_dispatched: true });
      const description = 'Order completed by kitchen';

      await this.orderLog.createOrderLog({
        time: new Date().getTime().toString(),
        description,
      });

      this.orderGateway.pushOrderUpdate(order.id, description);
    }

    if (order.kitchen_dispatched && !order.completed) {
      await this.orderRepo.updateOrder(order.id, {
        rider_assigned: true,
        rider_id: '1',
      });
      const description = 'Order dispatched by front desk';

      await this.orderLog.createOrderLog({
        time: new Date().getTime().toString(),
        description,
      });

      this.orderGateway.pushOrderUpdate(order.id, description);
    }

    const totalOrderAmount = this.calculateTotalOrderAmount(
      order.calculatedOrder,
    );
    await this.calculatedOrder.updateCalculatedOrder(
      order.calculated_order_id,
      { total_amount: totalOrderAmount },
    );

    return {
      status: 'successful',
      message: 'Order processing successfully',
    };
  }

  async findAll(query: paginateDto): Promise<IServiceHelper> {
    const orders = await this.orderRepo.getAllOrder(query);
    return {
      status: 'successful',
      message: 'Orders fetched successfully',
      data: orders,
    };
  }

  async findOne(id: string): Promise<IServiceHelper> {
    const order = await this.orderRepo.getOrderById(id);
    return {
      status: 'successful',
      message: 'Order fetched successfully',
      data: order,
    };
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<IServiceHelper> {
    const updatedOrder = await this.orderRepo.updateOrder(id, updateOrderDto);
    return {
      status: 'successful',
      message: 'Order updated successfully',
      data: updatedOrder,
    };
  }

  async remove(id: string): Promise<IServiceHelper> {
    await this.orderRepo.deleteOrder(id);
    return {
      status: 'successful',
      message: 'Order updated successfully',
    };
  }
}
