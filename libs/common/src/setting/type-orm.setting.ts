import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { DataSource } from 'typeorm';

export enum AppName {
  ADMIN = 'admin',
  APP = 'app',
  BATCH = 'batch',
}

// TODO abstract
export function typeOrmSetting(appName?: AppName) {
  initializeTransactionalContext();

  const IS_TEST = process.env.NODE_ENV?.startsWith('test');

  return TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'postgres',
      entities: getEntities(appName, IS_TEST),
      synchronize: IS_TEST,
      dropSchema: IS_TEST,
      logging: process.env.NODE_ENV !== 'test',
      replication: {
        defaultMode: 'slave',
        master: {
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          port: +process.env.DB_PORT,
        },
        slaves: [
          {
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            username: process.env.DB_SLAVE_USERNAME,
            password: process.env.DB_SLAVE_PASSWORD,
            port: +process.env.DB_SLAVE_PORT,
          },
        ],
      },
    }),
    async dataSourceFactory(options) {
      return addTransactionalDataSource(new DataSource(options));
    },
  });
}

function getEntities(appName?: AppName, IS_TEST?: boolean) {
  const entities = IS_TEST
    ? [join(__dirname, '../../../domain/src/**/*.entity.ts')]
    : [join(__dirname, '../../../../libs/domain/src/**/*.entity.js')];
  if (appName === 'admin') {
    entities.push(
      IS_TEST
        ? join(__dirname, '../../../../apps/admin/src/**/*.entity.ts')
        : join(__dirname, '../../../../apps/admin/src/**/*.entity.js'),
    );
  } else if (appName === 'app') {
    entities.push(
      IS_TEST
        ? join(__dirname, '../../../../apps/app/src/**/*.entity.ts')
        : join(__dirname, '../../../../apps/app/src/**/*.entity.js'),
    );
  }
  return entities;
}
