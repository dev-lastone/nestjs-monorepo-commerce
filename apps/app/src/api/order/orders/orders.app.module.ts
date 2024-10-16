import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { ProductModule } from '@domain/domain/product/product.module';
import { OrderModule } from '@domain/domain/order/order.module';
import { UserAddressModule } from '../../../domain/user/address/user-address.module';

@Module({
  imports: [ProductModule, OrderModule, UserAddressModule],
  controllers: [OrdersAppController],
  providers: [OrdersAppService],
})
export class OrdersAppModule {}
