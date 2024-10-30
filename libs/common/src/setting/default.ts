import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

export function defaultSetting(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // queryParam :type 자동, queryString @Type 필요. body 입력 그대로
    }),
  );
}
