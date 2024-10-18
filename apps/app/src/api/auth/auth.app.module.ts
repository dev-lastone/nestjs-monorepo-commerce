import { Module } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { AuthAppController } from './auth.app.controller';
import { AppUserModule } from '@domain/app-user/app-user.module';
import { AuthApplicationModule } from '@application/auth/auth.application.module';

@Module({
  imports: [AuthApplicationModule, AppUserModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
