import { Module } from '@nestjs/common';
import { OrderModule } from '@domain/order/order.module';
import { OrderApplicationService } from '@application/order/order.application.service';
import { AppUserPointApplicationModule } from '@application/app-user-point/app-user-point.application.module';

@Module({
  imports: [OrderModule, AppUserPointApplicationModule],
  providers: [OrderApplicationService],
  exports: [OrderApplicationService],
})
export class OrderApplicationModule {}
