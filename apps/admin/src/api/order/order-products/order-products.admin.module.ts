import { Module } from '@nestjs/common';
import { OrderProductsAdminController } from './order-products.admin.controller';
import { OrderProductsAdminService } from './order-products.admin.service';
import { OrderModule } from '@domain/domain/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrderProductsAdminController],
  providers: [OrderProductsAdminService],
})
export class OrderProductsModule {}
