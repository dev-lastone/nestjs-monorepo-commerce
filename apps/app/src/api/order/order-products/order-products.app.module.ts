import { Module } from '@nestjs/common';
import { OrderModule } from '@domain/domain/order/order.module';
import { OrderProductsAppController } from './order-products.app.controller';
import { OrderProductsAppService } from './order-products.app.service';

@Module({
  imports: [OrderModule],
  controllers: [OrderProductsAppController],
  providers: [OrderProductsAppService],
})
export class OrderProductsAppModule {}
