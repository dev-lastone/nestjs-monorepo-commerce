import { Module } from '@nestjs/common';
import { OrderProductsAppModule } from './order-products/order-products.app.module';
import { OrdersAppModule } from './orders/orders.app.module';

@Module({
  imports: [OrdersAppModule, OrderProductsAppModule],
})
export class OrderAppModule {}
