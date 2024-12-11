import { Module } from '@nestjs/common';
import { ProductLikeAppController } from './product-like.app.controller';
import { ProductModule } from '@application/product/product.module';
import { ProductLikeModule } from '../../../../application/product/like/product-like.module';

@Module({
  imports: [ProductModule, ProductLikeModule],
  controllers: [ProductLikeAppController],
})
export class ProductLikeAppModule {}
