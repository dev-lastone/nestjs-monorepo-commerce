import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { ProductModule } from '@application/product/product.module';
import { OrderModule } from '@application/order/order.module';
import { OrdersAppRepo } from './orders.app.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@domain/order/order.entity';
import { UserAddressModule } from '../../../application/user/address/user-address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductModule,
    OrderModule,
    UserAddressModule,
  ],
  controllers: [OrdersAppController],
  providers: [OrdersAppService, OrdersAppRepo],
})
export class OrdersAppModule {}
