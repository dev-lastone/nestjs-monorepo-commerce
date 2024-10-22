import { Module } from '@nestjs/common';
import { AppUserPointApplicationService } from '@application/app-user-point/app-user-point.application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointApplicationRepo } from '@application/app-user-point/app-user-point.application.repo';

@Module({
  imports: [TypeOrmModule.forFeature([AppUserPoint])],
  providers: [AppUserPointApplicationService, AppUserPointApplicationRepo],
  exports: [AppUserPointApplicationService],
})
export class AppUserPointApplicationModule {}
