import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchemaName, OrderSchema } from './order.schema';

import { OrderController } from './order.controller';

import { OrderService } from './order.service';

import { OrderResolver } from './order.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderSchemaName, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
