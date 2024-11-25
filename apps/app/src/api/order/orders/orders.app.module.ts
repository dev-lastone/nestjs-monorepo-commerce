import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { ProductApplicationModule } from '@application/product/product.application.module';
import { UserAddressModule } from '@domain/app-user/address/user-address.module';
import { OrderApplicationModule } from '@application/order/order.application.module';

@Module({
  imports: [
    ProductApplicationModule,
    OrderApplicationModule,
    UserAddressModule,
  ],
  controllers: [OrdersAppController],
  providers: [OrdersAppService],
})
export class OrdersAppModule {}
