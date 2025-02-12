import { Module } from '@nestjs/common';
import { OrderBatchService } from './order.batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderBatchRepo } from './order.batch.repo';
import { OrderModule } from '@application/order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct]), OrderModule],
  providers: [OrderBatchService, OrderBatchRepo],
})
export class OrderBatchModule {}
