import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // читаем переменную и превращаем в массив
  const allowedOrigins =
    process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) || [];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: 'Authorization, Content-Type',
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // удаляет лишние поля
      // forbidNonWhitelisted: true, // выбрасывает 400, если пришли поля не из DTO
      // transform: true, // преобразует типы (строка → число)
    }),
  );

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('Документация API')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
