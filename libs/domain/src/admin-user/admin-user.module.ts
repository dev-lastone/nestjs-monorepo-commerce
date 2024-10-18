import { Module } from '@nestjs/common';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';

@Module({
  providers: [AdminUserRepo],
  exports: [AdminUserRepo],
})
export class AdminUserModule {}
