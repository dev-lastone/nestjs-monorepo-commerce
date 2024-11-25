import { Module } from '@nestjs/common';
import { ProductApplicationService } from '@application/product/product.application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@domain/product/product.entity';
import { ProductRepo } from '@application/product/product.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductApplicationService, ProductRepo],
  exports: [ProductApplicationService, ProductRepo],
})
export class ProductApplicationModule {}
