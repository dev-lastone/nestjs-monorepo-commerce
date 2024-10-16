import { Module } from '@nestjs/common';
import { OrderModule } from '@domain/domain/order/order.module';
import { OrderProductsAppController } from './order-products.app.controller';

@Module({
  imports: [OrderModule],
  controllers: [OrderProductsAppController],
})
export class OrderProductsAppModule {}
