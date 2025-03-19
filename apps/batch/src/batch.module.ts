import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderBatchModule } from './order/order.batch.module';
import { configModule } from '@common/setting/config';
import { AppName, typeOrmSetting } from '@common/setting/type-orm.setting';
import { PointBatchModule } from './point/point.batch.module';

@Module({
  imports: [
    configModule(),
    typeOrmSetting(AppName.BATCH),
    ScheduleModule.forRoot(),
    OrderBatchModule,
    PointBatchModule,
  ],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
