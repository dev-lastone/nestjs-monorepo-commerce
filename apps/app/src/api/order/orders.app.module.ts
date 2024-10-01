import { Module } from '@nestjs/common';
import { OrdersAppController } from './orders.app.controller';
import { OrdersAppService } from './orders.app.service';

@Module({
  controllers: [OrdersAppController],
  providers: [OrdersAppService],
})
export class OrdersAppModule {}
