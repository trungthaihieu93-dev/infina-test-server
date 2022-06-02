import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema, UserSchemaName } from './user.model';

import { UserController } from './user.controller';

import { UserService } from './user.service';

import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSchemaName, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
