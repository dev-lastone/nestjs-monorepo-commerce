import { Module } from '@nestjs/common';
import { ProductRepo } from '@domain/product/product.repo';

@Module({
  providers: [ProductRepo],
  exports: [ProductRepo],
})
export class ProductModule {}
