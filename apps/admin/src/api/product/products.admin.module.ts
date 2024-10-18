import { Module } from '@nestjs/common';
import { ProductsAdminController } from './products.admin.controller';
import { ProductApplicationModule } from '@application/product/product.application.module';

@Module({
  imports: [ProductApplicationModule],
  controllers: [ProductsAdminController],
})
export class ProductsAdminModule {}
