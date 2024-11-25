import { Module } from '@nestjs/common';
import { OrdersAdminController } from './orders.admin.controller';
import { OrdersAdminService } from './orders.admin.service';
import { OrderApplicationModule } from '@application/order/order.application.module';

@Module({
  imports: [OrderApplicationModule],
  controllers: [OrdersAdminController],
  providers: [OrdersAdminService],
})
export class OrdersAdminModule {}
