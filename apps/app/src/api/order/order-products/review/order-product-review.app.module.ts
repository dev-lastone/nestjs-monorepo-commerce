import { Module } from '@nestjs/common';
import { OrderProductReviewAppController } from './order-product-review.app.controller';
import { OrderModule } from '@application/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrderProductReviewAppController],
})
export class OrderProductReviewAppModule {}
