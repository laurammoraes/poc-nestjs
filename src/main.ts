import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectOrm } from './database/drizzle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  require('dotenv').config();

  await connectOrm();
  await app.listen(3000);
}
bootstrap();
