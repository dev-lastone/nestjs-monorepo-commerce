import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';

export function typeOrmAdminSetting() {
  const entities = [
    join(__dirname, '../../../../libs/domain/src/**/*.entity.js'),
    join(__dirname, '../../../../apps/admin/src/**/*.entity.js'),
  ];
  return createTypeOrmSetting({
    entities,
    synchronize: true,
    dropSchema: false,
  });
}

export function typeOrmAppSetting() {
  const entities = [
    join(__dirname, '../../../../libs/domain/src/**/*.entity.js'),
    join(__dirname, '../../../../apps/app/src/**/*.entity.js'),
  ];
  return createTypeOrmSetting({
    entities,
    synchronize: true,
    dropSchema: false,
  });
}

export function typeOrmAdminTestSetting() {
  const entities = [
    join(__dirname, '../../../domain/src/**/*.entity.ts'),
    join(__dirname, '../../../../apps/admin/src/**/*.entity.ts'),
  ];
  return createTypeOrmSetting({
    entities,
    synchronize: true,
    dropSchema: true,
  });
}

export function typeOrmAppTestSetting() {
  const entities = [
    join(__dirname, '../../../domain/src/**/*.entity.ts'),
    join(__dirname, '../../../../apps/app/src/**/*.entity.ts'),
  ];
  return createTypeOrmSetting({
    entities,
    synchronize: true,
    dropSchema: true,
  });
}

function createTypeOrmSetting(dto: {
  entities: string[];
  synchronize: boolean;
  dropSchema: boolean;
}) {
  const { entities, synchronize, dropSchema } = dto;

  initializeTransactionalContext();

  return TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'postgres',
      entities,
      synchronize,
      dropSchema,
      logging: true,
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
