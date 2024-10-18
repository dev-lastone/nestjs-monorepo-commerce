import { Module } from '@nestjs/common';
import { ProductsAppController } from './products.app.controller';
import { ProductApplicationModule } from '@application/product/product.application.module';

@Module({
  imports: [ProductApplicationModule],
  controllers: [ProductsAppController],
})
export class ProductsAppModule {}
