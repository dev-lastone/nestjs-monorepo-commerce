import { Module } from '@nestjs/common';
import { OrderApplicationService } from '@application/order/order.application.service';
import { AppUserPointApplicationModule } from '@application/app-user-point/app-user-point.application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@domain/order/order.entity';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { OrderRepo } from '@application/order/order.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProduct, OrderProductReview]),
    AppUserPointApplicationModule,
  ],
  providers: [OrderApplicationService, OrderRepo],
  exports: [OrderApplicationService, OrderRepo],
})
export class OrderApplicationModule {}
