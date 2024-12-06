import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { ProductModule } from '@application/product/product.module';
import { UserAddressModule } from '@application/app-user/address/user-address.module';
import { OrderModule } from '@application/order/order.module';

@Module({
  imports: [ProductModule, OrderModule, UserAddressModule],
  controllers: [OrdersAppController],
  providers: [OrdersAppService],
})
export class OrdersAppModule {}
