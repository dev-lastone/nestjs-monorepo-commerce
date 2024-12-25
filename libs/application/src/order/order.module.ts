import { Module } from '@nestjs/common';
import { OrderService } from '@application/order/order.service';
import { AppUserPointModule } from '@application/app-user-point/app-user-point.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@domain/order/order.entity';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { OrderRepo } from '@application/order/order.repo';
import { ProductModule } from '@application/product/product.module';
import { UserAddressModule } from '../../../../apps/app/src/application/user/address/user-address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProduct, OrderProductReview]),
    ProductModule,
    UserAddressModule,
    AppUserPointModule,
  ],
  providers: [OrderService, OrderRepo],
  exports: [OrderService],
})
export class OrderModule {}
