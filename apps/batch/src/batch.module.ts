import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PointBatchModule } from './point/point.batch.module';

@Module({
  imports: [ScheduleModule.forRoot(), PointBatchModule],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
