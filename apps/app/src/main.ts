import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { swagger } from '@common/common/setting/swagger';
import { defaultSetting } from '@common/common/setting/default';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  defaultSetting(app);

  swagger(app, 'APP');

  await app.listen(3000);
}
bootstrap();
