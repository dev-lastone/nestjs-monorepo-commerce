import { Module } from '@nestjs/common';
import { ProductsAdminController } from './products.admin.controller';
import { ProductModule } from '@application/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@domain/product/product.entity';
import { ProductsAdminRepo } from './products.admin.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductModule],
  controllers: [ProductsAdminController],
  providers: [ProductsAdminRepo],
})
export class ProductsAdminModule {}
