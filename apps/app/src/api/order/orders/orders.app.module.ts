import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { OrderModule } from '@domain/order/order.module';
import { ProductApplicationModule } from '@application/product/product.application.module';
import { UserAddressModule } from '@domain/app-user/address/user-address.module';

@Module({
  imports: [ProductApplicationModule, OrderModule, UserAddressModule],
  controllers: [OrdersAppController],
  providers: [OrdersAppService],
})
export class OrdersAppModule {}
