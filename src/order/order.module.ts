import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderResolver]
})
export class OrderModule {}
