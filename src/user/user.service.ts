import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserSchemaName,
  UserDocument,
  User,
  CreateUserInput,
  UpdateUserInput,
} from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserDocument>,
  ) {}

  async getUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
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
