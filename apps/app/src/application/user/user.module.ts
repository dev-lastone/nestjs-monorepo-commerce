import { Module } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppUser])],
  providers: [UserService, UserRepo],
  exports: [UserService],
})
export class UserModule {}
