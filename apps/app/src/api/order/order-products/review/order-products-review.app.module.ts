import { Module } from '@nestjs/common';
import { OrderProductsReviewAppController } from './order-products-review.app.controller';
import { OrderModule } from '@application/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrderProductsReviewAppController],
})
export class OrderProductsReviewAppModule {}
