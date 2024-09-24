import { Module } from '@nestjs/common';
import { ProductsAppController } from './products.app.controller';
import { ProductModule } from '@domain/domain/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [ProductsAppController],
})
export class ProductsAppModule {}
