import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swagger } from '@common/common/setting/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  swagger(app, 'APP');

  await app.listen(3000);
}
bootstrap();
