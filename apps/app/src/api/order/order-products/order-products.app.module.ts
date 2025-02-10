import { Module } from '@nestjs/common';
import { OrderProductsAppController } from './order-products.app.controller';
import { OrderProductsAppRepo } from './order-products.app.repo';
import { OrderProductsAppService } from './order-products.app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderModule } from '@application/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct]), OrderModule],
  controllers: [OrderProductsAppController],
  providers: [OrderProductsAppService, OrderProductsAppRepo],
})
export class OrderProductsAppModule {}
