import { Module } from '@nestjs/common';
import { OrderProductsReviewAppController } from './order-products-review.app.controller';
import { OrderApplicationModule } from '@application/order/order.application.module';

@Module({
  imports: [OrderApplicationModule],
  controllers: [OrderProductsReviewAppController],
})
export class OrderProductsReviewAppModule {}
