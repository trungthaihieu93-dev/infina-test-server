import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

export const checkPhoneMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return value;
};
