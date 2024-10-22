import { Module } from '@nestjs/common';
import { OrderRepo } from '@domain/order/order.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@domain/order/order.entity';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProduct, OrderProductReview]),
  ],
  providers: [OrderRepo],
  exports: [OrderRepo],
})
export class OrderModule {}
