import { Module } from '@nestjs/common';
import { AppUserCartService } from './app-user-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { AppUserCartRepo } from './app-user-cart.repo';

@Module({
  imports: [TypeOrmModule.forFeature([AppUserCart])],
  providers: [AppUserCartService, AppUserCartRepo],
  exports: [AppUserCartService],
})
export class AppUserCartModule {}
