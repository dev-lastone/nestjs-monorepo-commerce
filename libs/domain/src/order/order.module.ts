import { Module } from '@nestjs/common';
import { OrderRepo } from '@domain/order/order.repo';

@Module({
  providers: [OrderRepo],
  exports: [OrderRepo],
})
export class OrderModule {}
