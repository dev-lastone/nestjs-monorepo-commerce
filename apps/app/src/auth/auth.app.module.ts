import { Module } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { AuthAppController } from './auth.app.controller';
import { AuthModule } from '@domain/domain/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
