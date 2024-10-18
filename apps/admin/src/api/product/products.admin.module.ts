import { Module } from '@nestjs/common';
import { ProductsAdminController } from './products.admin.controller';
import { ProductModule } from '@domain/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [ProductsAdminController],
})
export class ProductsAdminModule {}
