import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateOrderInput,
  Order,
  OrderDocument,
  OrderSchemaName,
  OrderWithAccruedAmount,
} from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderSchemaName) private orderModel: Model<OrderDocument>,
  ) {}

  async getOrderByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId });
  }

  async getOrderById(orderId: string): Promise<OrderWithAccruedAmount> {
    const order = await this.orderModel.findById(orderId).lean();

    const { interest_rate, amount, created_at } = order;
    const accrued_amount = [];
    let baseAmount = amount;
    const numOfPassedMonths =
      new Date().getMonth() - new Date(created_at).getMonth();

    for (let i = 0; i < numOfPassedMonths; i++) {
      const temp_accrued = baseAmount * (1 + interest_rate);
      accrued_amount.push(temp_accrued);
      baseAmount = temp_accrued;
    }

    const orderWithAccruedAmount: OrderWithAccruedAmount = {
      ...order,
      accrued_amount,
    };

    return orderWithAccruedAmount;
  }

  async createOrder(payload: CreateOrderInput): Promise<Order> {
    const newOrder = new this.orderModel(payload);

    return newOrder.save();
  }
}
