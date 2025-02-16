import { Module } from '@nestjs/common';
import { PointBatchService } from './point.batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointBatchRepo } from './point.batch.repo';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointModule } from '@application/app-user-point/app-user-point.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppUserPoint]), AppUserPointModule],
  providers: [PointBatchService, PointBatchRepo],
})
export class PointBatchModule {}
