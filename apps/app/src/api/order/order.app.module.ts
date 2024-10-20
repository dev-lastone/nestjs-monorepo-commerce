import { Module } from '@nestjs/common';
import { OrderProductsAppModule } from './order-products/order-products.app.module';
import { OrdersAppModule } from './orders/orders.app.module';
import { OrderProductsReviewAppModule } from './order-products/review/order-products-review.app.module';

@Module({
  imports: [
    OrdersAppModule,
    OrderProductsAppModule,
    OrderProductsReviewAppModule,
  ],
})
export class OrderAppModule {}
