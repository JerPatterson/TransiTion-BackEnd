import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET',
    credentials: true,
  });
  app.use(bodyParser.json({ limit: '2mb' }));
  await app.listen(3000);
}
bootstrap();
