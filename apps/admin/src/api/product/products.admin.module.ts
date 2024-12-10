import { Module } from '@nestjs/common';
import { ProductsAdminController } from './products.admin.controller';
import { ProductModule } from '@application/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@domain/product/product.entity';
import { ProductsAdminRepo } from './products.admin.repo';
import { ProductsAdminService } from './products.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductModule],
  controllers: [ProductsAdminController],
  providers: [ProductsAdminService, ProductsAdminRepo],
})
export class ProductsAdminModule {}
