import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { ProductModule } from '@application/product/product.module';
import { OrderModule } from '@application/order/order.module';
import { AppUserAddressModule } from '@application/app-user/address/app-user-address.module';

@Module({
  imports: [ProductModule, OrderModule, AppUserAddressModule],
  controllers: [OrdersAppController],
  providers: [OrdersAppService],
})
export class OrdersAppModule {}
