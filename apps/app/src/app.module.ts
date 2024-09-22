import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthAppModule } from './auth/auth.app.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '../../admin/src/config/env.validation';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: join(__dirname, '../../../.env'),
    }),
    AuthAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
