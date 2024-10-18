import { Module } from '@nestjs/common';
import { OrdersAdminController } from './orders.admin.controller';
import { OrdersAdminService } from './orders.admin.service';
import { OrderModule } from '@domain/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [OrdersAdminController],
  providers: [OrdersAdminService],
})
export class OrdersAdminModule {}
