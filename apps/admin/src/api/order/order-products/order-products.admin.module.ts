import { Module } from '@nestjs/common';
import { OrderProductsAdminController } from './order-products.admin.controller';
import { OrderModule } from '@application/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrderProductsAdminController],
})
export class OrderProductsAdminModule {}
