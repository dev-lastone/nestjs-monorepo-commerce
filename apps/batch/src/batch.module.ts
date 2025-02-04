import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderBatchModule } from './order/order.batch.module';

@Module({
  imports: [ScheduleModule.forRoot(), OrderBatchModule],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
