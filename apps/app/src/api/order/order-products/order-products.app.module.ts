import { Module } from '@nestjs/common';
import { OrderProductsAppController } from './order-products.app.controller';
import { OrderApplicationModule } from '@application/application/order/order.application.module';

@Module({
  imports: [OrderApplicationModule],
  controllers: [OrderProductsAppController],
})
export class OrderProductsAppModule {}
