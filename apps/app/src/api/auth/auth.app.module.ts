import { Module } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { AuthAppController } from './auth.app.controller';
import { AuthModule } from '@domain/auth/auth.module';
import { AppUserModule } from '@domain/app-user/app-user.module';

@Module({
  imports: [AuthModule, AppUserModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
