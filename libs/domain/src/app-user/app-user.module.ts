import { Module } from '@nestjs/common';
import { AppUserRepo } from './app-user.repo';

@Module({
  providers: [AppUserRepo],
  exports: [AppUserRepo],
})
export class AppUserModule {}
