import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

export type OrderDocument = Order & Document;

@Schema()
@ObjectType({ description: 'Order Model' })
export class Order {
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  @Field({ nullable: false })
  user: string;

  @Prop({ required: true })
  @Field({ nullable: false })
  code: string;

  @Prop({ required: true, default: 0 })
  @Field(() => Int)
  amount: number;

  @Prop({ required: true, default: 0 })
  @Field(() => Int)
  interest_rate: number;

  @Prop({ default: new Date() })
  @Field({ nullable: false })
  created_at: number;
}

@ObjectType()
export class OrderWithAccruedAmount extends Order {
  @Field(() => [Int])
  accrued_amount: number[];
}

@InputType()
export class CreateOrderInput {
  @Field({ nullable: false })
  user: string;

  @Field({ nullable: false })
  code: string;

  @Field({ nullable: false })
  amount: number;

  @Field({ nullable: false })
  interest_rate: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export const OrderSchemaName = 'Order';
