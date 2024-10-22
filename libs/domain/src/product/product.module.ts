import { Module } from '@nestjs/common';
import { ProductRepo } from '@domain/product/product.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@domain/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductRepo],
  exports: [ProductRepo],
})
export class ProductModule {}
