import { Module } from '@nestjs/common';
import { AppUserRepo } from './app-user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppUser])],
  providers: [AppUserRepo],
  exports: [AppUserRepo],
})
export class AppUserModule {}
