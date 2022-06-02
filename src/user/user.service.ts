import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderService } from 'src/order/order.service';

import {
  UserSchemaName,
  UserDocument,
  User,
  CreateUserInput,
  UpdateUserInput,
  UserWithOrderAmount,
} from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(userId: string): Promise<UserWithOrderAmount> {
    const ordersByUser = await this.orderService.getOrderByUser(userId);

    const total_amount = ordersByUser.reduce((a, b) => a + b.amount, 0);

    const user = await this.userModel.findById(userId).lean();

    const userWithOrderAmount: UserWithOrderAmount = {
      ...user,
      total_amount,
    };

    return userWithOrderAmount;
  }

  async createOrUpdateUser(
    payload: CreateUserInput | UpdateUserInput,
    userId?: string,
  ): Promise<User> {
    if (userId) {
      // Update
      return this.userModel.findByIdAndUpdate(userId, payload);
    } else {
      // Create
      const createdUser = new this.userModel(payload);

      return createdUser.save();
    }
  }
}
