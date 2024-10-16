import { Module } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { OrderService } from '@domain/domain/order/order.service';

@Module({
  providers: [OrderService, OrderRepo],
  exports: [OrderService, OrderRepo],
})
export class OrderModule {}
