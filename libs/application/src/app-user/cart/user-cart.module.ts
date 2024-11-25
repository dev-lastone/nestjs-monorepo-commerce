import { Module } from '@nestjs/common';
import { UserCartService } from './user-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCart } from '@domain/app-user/user-cart.entity';
import { UserCartRepo } from './user-cart.repo';

@Module({
  imports: [TypeOrmModule.forFeature([UserCart])],
  providers: [UserCartService, UserCartRepo],
  exports: [UserCartService],
})
export class UserCartModule {}
