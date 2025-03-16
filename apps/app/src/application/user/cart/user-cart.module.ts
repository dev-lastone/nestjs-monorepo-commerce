import { Module } from '@nestjs/common';
import { UserCartService } from './user-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { UserCartRepo } from './user-cart.repo';
import { ProductModule } from '@application/product/product.module';
import { ProductService } from '@application/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppUserCart]), ProductModule],
  providers: [UserCartService, UserCartRepo, ProductService],
  exports: [UserCartService],
})
export class UserCartModule {}
