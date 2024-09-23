import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swagger } from '@common/common/setting/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  swagger(app, 'ADMIN');

  await app.listen(3000);
}
bootstrap();
