import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminController } from './auth.admin.controller';
import { AuthModule } from '@domain/domain/auth/auth.module';
import { AdminUserModule } from '@domain/domain/admin-user/admin-user.module';

@Module({
  imports: [AuthModule, AdminUserModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
