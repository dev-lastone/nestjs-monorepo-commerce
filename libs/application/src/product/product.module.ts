import { Module } from '@nestjs/common';
import { ProductService } from '@application/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@domain/product/product.entity';
import { ProductRepo } from '@application/product/product.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductRepo],
  exports: [ProductService, ProductRepo],
})
export class ProductModule {}
