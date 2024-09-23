import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '../../../../apps/admin/src/config/env.validation';
import { join } from 'path';

export function configModule() {
  return ConfigModule.forRoot({
    isGlobal: true,
    validate: validateEnv,
    envFilePath: [
      join(__dirname, '../../../.env'),
      join(__dirname, '../../../../.env'),
    ],
  });
}
