import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { validateEnv } from '@common/common/config/env.validation';

export function configModule() {
  return ConfigModule.forRoot({
    isGlobal: true,
    validate: validateEnv,
    envFilePath: [
      join(__dirname, '../../../.env'), // build
      join(__dirname, '../../../../.env'), // test
    ],
  });
}
