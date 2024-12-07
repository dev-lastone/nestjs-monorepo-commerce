import { Module } from '@nestjs/common';
import { AppUserRepo } from './app-user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';
import { AppUserService } from '@application/app-user/app-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppUser])],
  providers: [AppUserService, AppUserRepo],
  exports: [AppUserService, AppUserRepo],
})
export class AppUserModule {}
