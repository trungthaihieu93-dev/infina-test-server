import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forRoot(process.env.DATABASE_URL)],
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/test')],
})
export class DatabaseModule {}
