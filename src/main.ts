import * as dotenv from 'dotenv';
dotenv.config(); // Certifique-se de que esta linha vem antes de qualquer outro código

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectOrm } from './database/drizzle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await connectOrm(); // Chama connectOrm após dotenv.config() carregar as variáveis
  await app.listen(3000);
}
bootstrap();
