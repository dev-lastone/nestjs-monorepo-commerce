import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminController } from './auth.admin.controller';
import { AuthModule } from '@domain/domain/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
