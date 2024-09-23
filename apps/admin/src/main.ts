import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { swagger } from '@common/common/setting/swagger';
import { defaultSetting } from '@common/common/setting/default';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  defaultSetting(app);

  swagger(app, 'ADMIN');

  await app.listen(3000);
}
bootstrap();
