import { Module } from '@nestjs/common';
import { UserCartService } from './user-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { UserCartRepo } from './user-cart.repo';

@Module({
  imports: [TypeOrmModule.forFeature([AppUserCart])],
  providers: [UserCartService, UserCartRepo],
  exports: [UserCartService],
})
export class UserCartModule {}
