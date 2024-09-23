import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

export function defaultSetting(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());
}
