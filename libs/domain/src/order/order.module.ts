import { Module } from '@nestjs/common';
import { OrderRepo } from '@domain/domain/order/order.repo';
import { OrderService } from '@domain/domain/order/order.service';
import { UserPointModule } from '@domain/domain/app-user/point/user-point.module';

@Module({
  imports: [UserPointModule],
  providers: [OrderService, OrderRepo],
  exports: [OrderService, OrderRepo],
})
export class OrderModule {}
