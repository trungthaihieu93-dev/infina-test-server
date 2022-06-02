import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Order, CreateOrderInput, OrderWithAccruedAmount } from './order.model';

import { OrderService } from './order.service';

@Resolver((returns) => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query((returns) => [Order], { name: 'orders', nullable: false })
  async getOrderByUser(
    @Args({ name: 'userId' }) userId: string,
  ): Promise<Order[]> {
    return this.orderService.getOrderByUser(userId);
  }

  @Query((returns) => OrderWithAccruedAmount, {
    name: 'order',
    nullable: false,
  })
  async getOrderById(@Args({ name: 'id' }) orderId: string): Promise<Order> {
    return this.orderService.getOrderById(orderId);
  }

  @Mutation((returns) => Order, { name: 'createOrder' })
  async createUser(@Args('payload') payload: CreateOrderInput): Promise<Order> {
    return this.orderService.createOrder(payload);
  }
}
