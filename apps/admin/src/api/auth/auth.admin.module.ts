import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminController } from './auth.admin.controller';
import { AdminUserModule } from '@domain/admin-user/admin-user.module';
import { AuthApplicationModule } from '@application/auth/auth.application.module';

@Module({
  imports: [AuthApplicationModule, AdminUserModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
