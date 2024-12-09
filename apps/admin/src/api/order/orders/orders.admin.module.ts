import { Module } from '@nestjs/common';
import { OrdersAdminController } from './orders.admin.controller';
import { OrdersAdminService } from './orders.admin.service';
import { OrdersAdminRepo } from './orders.admin.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@domain/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersAdminController],
  providers: [OrdersAdminService, OrdersAdminRepo],
})
export class OrdersAdminModule {}
