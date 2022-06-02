import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateOrderInput,
  Order,
  OrderDocument,
  OrderSchemaName,
} from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderSchemaName) private orderModel: Model<OrderDocument>,
  ) {}

  async getOrderByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId });
  }

  async getOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId);
  }

  async createOrder(payload: CreateOrderInput): Promise<Order> {
    const newOrder = new this.orderModel(payload);

    return newOrder.save();
  }
}
