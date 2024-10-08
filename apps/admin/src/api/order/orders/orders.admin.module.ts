import { Module } from '@nestjs/common';
import { OrdersAdminController } from './orders.admin.controller';
import { OrdersAdminService } from './orders.admin.service';

@Module({
  controllers: [OrdersAdminController],
  providers: [OrdersAdminService],
})
export class OrdersAdminModule {}
