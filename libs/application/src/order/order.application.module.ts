import { Module } from '@nestjs/common';
import { OrderModule } from '@domain/domain/order/order.module';
import { OrderApplicationService } from '@application/application/order/order.application.service';
import { UserPointModule } from '@domain/domain/app-user/point/user-point.module';

@Module({
  imports: [OrderModule, UserPointModule],
  providers: [OrderApplicationService],
  exports: [OrderApplicationService],
})
export class OrderApplicationModule {}
