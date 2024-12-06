import { Module } from '@nestjs/common';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';

@Module({
  imports: [TypeOrmModule.forFeature([AppUserPoint])],
  providers: [AppUserPointService, AppUserPointRepo],
  exports: [AppUserPointService],
})
export class AppUserPointModule {}
