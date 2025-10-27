import { createServer, proxy } from 'aws-serverless-express';
import { AppModule } from './src/app.module';
import { NestFactory } from '@nestjs/core';
import { VercelRequest, VercelResponse } from '@vercel/node';

let server;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    server = createServer(app.getHttpAdapter().getInstance());
  }
  proxy(server, req, res, 'PROMISE').promise;
}
