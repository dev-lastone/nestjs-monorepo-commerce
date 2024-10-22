import { Module } from '@nestjs/common';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '@domain/admin-user/admin-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [AdminUserRepo],
  exports: [AdminUserRepo],
})
export class AdminUserModule {}
