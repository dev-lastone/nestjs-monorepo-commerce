import { Module } from '@nestjs/common';
import { OrderProductsAppController } from './order-products.app.controller';
import { OrderModule } from '@application/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrderProductsAppController],
})
export class OrderProductsAppModule {}
