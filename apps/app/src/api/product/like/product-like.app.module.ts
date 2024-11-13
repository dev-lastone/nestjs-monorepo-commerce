import { Module } from '@nestjs/common';
import { ProductLikeAppController } from './product-like.app.controller';
import { ProductLikeAppService } from './product-like.app.service';
import { ProductApplicationModule } from '@application/product/product.application.module';
import { ProductLikeModule } from '@domain/product/like/product-like.module';

@Module({
  imports: [ProductApplicationModule, ProductLikeModule],
  controllers: [ProductLikeAppController],
  providers: [ProductLikeAppService],
})
export class ProductLikeAppModule {}
