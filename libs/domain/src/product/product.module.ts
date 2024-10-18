import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepo } from '@domain/product/product.repo';

@Module({
  providers: [ProductService, ProductRepo],
  exports: [ProductService],
})
export class ProductModule {}
