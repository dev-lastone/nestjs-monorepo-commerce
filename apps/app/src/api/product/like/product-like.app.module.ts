import { Module } from '@nestjs/common';
import { ProductLikeAppController } from './product-like.app.controller';
import { ProductLikeAppService } from './product-like.app.service';
import { ProductModule } from '@domain/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [ProductLikeAppController],
  providers: [ProductLikeAppService],
})
export class ProductLikeAppModule {}
