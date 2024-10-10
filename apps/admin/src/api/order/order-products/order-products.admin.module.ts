import { Module } from '@nestjs/common';
import { OrderProductsAdminController } from './order-products.admin.controller';
import { OrderProductsAdminService } from './order-products.admin.service';

@Module({
  controllers: [OrderProductsAdminController],
  providers: [OrderProductsAdminService],
})
export class OrderProductsModule {}
