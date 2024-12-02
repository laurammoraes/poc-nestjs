import * as dotenv from 'dotenv';


import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { connectOrm } from './database/drizzle';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  await connectOrm(); 
  await app.listen(3000);
}
bootstrap();
