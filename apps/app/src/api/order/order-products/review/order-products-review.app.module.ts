import { Module } from '@nestjs/common';
import { OrderProductsReviewAppController } from './order-products-review.app.controller';

@Module({
  controllers: [OrderProductsReviewAppController],
})
export class OrderProductsReviewAppModule {}
