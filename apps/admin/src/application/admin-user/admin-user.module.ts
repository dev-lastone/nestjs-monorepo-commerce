import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '../../domain/admin-user/admin-user.entity';
import { AdminUserRepo } from './admin-user.repo';
import { AdminUserService } from './admin-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [AdminUserService, AdminUserRepo],
  exports: [AdminUserService],
})
export class AdminUserModule {}
