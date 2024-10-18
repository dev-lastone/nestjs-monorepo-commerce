import { Module } from '@nestjs/common';
import { OrderProductsAdminController } from './order-products.admin.controller';
import { OrderApplicationModule } from '@application/order/order.application.module';

@Module({
  imports: [OrderApplicationModule],
  controllers: [OrderProductsAdminController],
})
export class OrderProductsAdminModule {}
