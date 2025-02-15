import { Module } from '@nestjs/common';
import { OrderProductsAdminController } from './order-products.admin.controller';
import { OrderModule } from '@application/order/order.module';
import { OrderProductsAdminRepo } from './order-products.admin.repo';
import { OrderProductsAdminService } from './order-products.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from '@domain/order/order-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct]), OrderModule],
  controllers: [OrderProductsAdminController],
  providers: [OrderProductsAdminService, OrderProductsAdminRepo],
})
export class OrderProductsAdminModule {}
