import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(json());

  app.enableCors({
    origin: ['*', 'http://localhost:3001'],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Ngrok-Skip-Browser-Warning',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
