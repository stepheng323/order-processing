import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exceptionFilters';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Env } from './lib/env.config';
import './lib/database/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Env.PORT || 3000;
  Logger.log(`🚀🚀🚀 Application is running on: http://localhost:${port}`);
  await app.listen(3000);
}
bootstrap();
