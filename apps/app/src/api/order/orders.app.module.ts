import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';
import { ProductModule } from '@domain/domain/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [OrdersAppController],
  providers: [OrdersAppService],
})
export class OrdersAppModule {}
