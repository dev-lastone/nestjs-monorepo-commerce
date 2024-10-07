import { Module } from '@nestjs/common';
import { OrdersAdminController } from './orders.admin.controller';

@Module({
  controllers: [OrdersAdminController],
})
export class OrdersAdminModule {}
