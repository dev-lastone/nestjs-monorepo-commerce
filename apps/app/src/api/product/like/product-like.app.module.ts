import { Module } from '@nestjs/common';
import { ProductLikeAppController } from './product-like.app.controller';
import { ProductLikeAppService } from './product-like.app.service';
import { ProductApplicationModule } from '@application/product/product.application.module';

@Module({
  imports: [ProductApplicationModule],
  controllers: [ProductLikeAppController],
  providers: [ProductLikeAppService],
})
export class ProductLikeAppModule {}
