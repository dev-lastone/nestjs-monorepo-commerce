import { Module } from '@nestjs/common';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';
import { AppUserPointConsumption } from '@domain/app-user/point/app-user-point-consumption.entity';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppUserPoint,
      AppUserPointHistory,
      AppUserPointStorage,
      AppUserPointConsumption,
    ]),
  ],
  providers: [AppUserPointService, AppUserPointRepo],
  exports: [AppUserPointService],
})
export class AppUserPointModule {}
