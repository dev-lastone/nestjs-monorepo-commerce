import { Module } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';

@Module({
  providers: [OrderRepo],
  exports: [OrderRepo],
})
export class OrderModule {}
