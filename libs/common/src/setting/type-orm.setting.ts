import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export enum AppName {
  ADMIN = 'admin',
  APP = 'app',
}

export function typeOrmSetting(appName: AppName) {
  return TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: getEntities(appName),
      synchronize: true,
      logging: process.env.NODE_ENV !== 'test',
    }),
  });
}

function getEntities(appName: AppName) {
  const entities = [
    join(__dirname, '../../../../libs/domain/src/**/*.entity.js'),
  ];
  if (appName === 'admin') {
    entities.push(join(__dirname, '../../../../apps/admin/src/**/*.entity.js'));
  } else if (appName === 'app') {
    entities.push(join(__dirname, '../../../../apps/app/src/**/*.entity.js'));
  }
  return entities;
}
