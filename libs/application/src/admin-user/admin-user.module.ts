import { Module } from '@nestjs/common';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '@domain/admin-user/admin-user.entity';
import { AdminUserService } from '@application/admin-user/admin-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [AdminUserService, AdminUserRepo],
  exports: [AdminUserService, AdminUserRepo],
})
export class AdminUserModule {}
