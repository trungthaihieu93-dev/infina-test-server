import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.NODE_ENV)

  await app.listen(
    process.env.NODE_ENV === 'development' ? process.env.API_PORT : 3000,
  );
}
bootstrap();
