import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthAppModule } from './auth/auth.app.module';
import { configModule } from '@common/common/setting/config';

@Module({
  imports: [configModule(), AuthAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
