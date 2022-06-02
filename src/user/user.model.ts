import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  Field,
  Int,
  ObjectType,
  InputType,
  PartialType,
} from '@nestjs/graphql';

import { GENDERS } from 'src/core/constants/enums';
import { checkPhoneMiddleware } from 'src/core/middlewares/graphql';

export type UserDocument = User & Document;

@Schema()
@ObjectType({ description: 'User Model' })
export class User {
  @Field({ nullable: false })
  _id: string;

  @Prop({ required: true })
  @Field({ nullable: false })
  full_name: string;

  @Prop({ required: true })
  @Field({ nullable: false })
  phone: string;

  @Prop()
  @Field({ nullable: true })
  email: string;

  @Prop()
  @Field({ nullable: true })
  age: number;

  @Prop({ enum: GENDERS })
  @Field({ nullable: true })
  gender: string;
}

@ObjectType({ description: 'User Model' })
export class UserWithOrderAmount extends User {
  @Field(() => Int)
  total_amount: number;
}

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  full_name: string;

  @Field({ nullable: false, middleware: [checkPhoneMiddleware] })
  phone: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  gender: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaName = 'User';
