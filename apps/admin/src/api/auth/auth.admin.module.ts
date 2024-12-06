import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminController } from './auth.admin.controller';
import { AdminUserModule } from '@application/admin-user/admin-user.module';
import { AuthModule } from '@application/auth/auth.module';

@Module({
  imports: [AuthModule, AdminUserModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
