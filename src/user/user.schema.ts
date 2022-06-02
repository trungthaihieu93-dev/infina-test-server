import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

import { GENDERS } from 'src/core/constants/enums';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Prop({ required: true })
  @Field({ nullable: false })
  full_name: string;

  @Prop({ required: true })
  @Field({ nullable: false })
  phone: string;

  @Prop()
  @Field({ nullable: true })
  email: string;

  @Prop({})
  @Field(() => Int)
  age: number;

  @Prop({ enum: GENDERS })
  @Field({ nullable: true })
  gender: string;
}

@InputType()
export class UserInput {
  @Field({ nullable: false })
  full_name: string;

  @Field({ nullable: false })
  phone: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaName = 'User';
