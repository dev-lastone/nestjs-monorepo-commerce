import { Module } from '@nestjs/common';
import { OrderModule } from '@domain/order/order.module';
import { OrderApplicationService } from '@application/order/order.application.service';
import { UserPointModule } from '@domain/app-user/point/user-point.module';

@Module({
  imports: [OrderModule, UserPointModule],
  providers: [OrderApplicationService],
  exports: [OrderApplicationService],
})
export class OrderApplicationModule {}
