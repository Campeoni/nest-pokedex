import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfiguration } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const puerto = EnvConfiguration().port;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(puerto);
  console.log(`app running on port ${puerto}`);
}
bootstrap();
