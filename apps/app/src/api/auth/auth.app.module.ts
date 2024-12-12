import { Module } from '@nestjs/common';
import { AuthAppService } from './auth.app.service';
import { AuthAppController } from './auth.app.controller';
import { AuthModule } from '@application/auth/auth.module';
import { UserModule } from '../../application/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
