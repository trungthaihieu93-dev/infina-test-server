import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserWithOrderAmount,
} from './user.model';

import { UserService } from './user.service';

@Resolver((_) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserWithOrderAmount, { name: 'user', nullable: false })
  async getUserById(@Args({ name: 'id' }) id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation((returns) => User, { name: 'createUser' })
  async createUser(@Args('payload') payload: CreateUserInput): Promise<User> {
    return this.userService.createOrUpdateUser(payload);
  }

  @Mutation((returns) => User, { name: 'updateUser' })
  async addMember(
    @Args({ name: 'userId' }) userId: string,
    @Args('payload') payload: UpdateUserInput,
  ) {
    return this.userService.createOrUpdateUser(payload, userId);
  }
}
