import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): PostgresConnectionOptions => {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [
            join(__dirname, '../../../../libs/domain/src/**/*.entity.js'), // domain (공통)
            // admin domain (admin 일 때만)
            // app domain (app 일 때만)
          ],
          synchronize: true,
          logging: process.env.NODE_ENV !== 'test',
        };
      },
    }),
  ],
})
export class TypeOrmSettingModule {}
