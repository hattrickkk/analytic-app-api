import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: 'Authorization, Content-Type',
  });

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('Документация API')
    .setVersion('1.0')
    // .addBearerAuth() // если используешь JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
