import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLike } from '@domain/product/product-like.entity';
import { ProductLikeRepo } from './product-like.repo';
import { ProductLikeService } from './product-like.service';
import { ProductModule } from '@application/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLike]), ProductModule],
  providers: [ProductLikeService, ProductLikeRepo],
  exports: [ProductLikeService],
})
export class ProductLikeModule {}
