import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLike } from './product-like.entity';
import { ProductLikeRepo } from './product-like.repo';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLike])],
  providers: [ProductLikeRepo],
  exports: [ProductLikeRepo],
})
export class ProductLikeModule {}
