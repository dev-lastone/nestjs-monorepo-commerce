import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { ProductModule } from '@application/product/product.module';
import { OrderModule } from '@application/order/order.module';
import { AppUserAddressModule } from '@application/app-user/address/app-user-address.module';
import { OrdersAppRepo } from './orders.app.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@domain/order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductModule,
    OrderModule,
    AppUserAddressModule,
  ],
  controllers: [OrdersAppController],
  providers: [OrdersAppService, OrdersAppRepo],
})
export class OrdersAppModule {}
