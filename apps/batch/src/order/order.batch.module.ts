import { Module } from '@nestjs/common';
import { OrderBatchService } from './order.batch.service';

@Module({
  providers: [OrderBatchService],
})
export class OrderBatchModule {}
