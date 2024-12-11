import { Module } from '@nestjs/common';
import { OrderProductsAppModule } from './order-products/order-products.app.module';
import { OrdersAppModule } from './orders/orders.app.module';
import { OrderProductReviewAppModule } from './order-products/review/order-product-review.app.module';

@Module({
  imports: [
    OrdersAppModule,
    OrderProductsAppModule,
    OrderProductReviewAppModule,
  ],
})
export class OrderAppModule {}
