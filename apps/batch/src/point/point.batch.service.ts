import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PointBatchRepo } from './point.batch.repo';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';

@Injectable()
export class PointBatchService {
  constructor(
    private readonly appUserPointService: AppUserPointService,

    private readonly pointBatchRepo: PointBatchRepo,
  ) {}

  @Cron('0 0 0 * * *')
  async expirePoint() {
    const expirationPoints = await this.pointBatchRepo.findExpirationPoints();

    expirationPoints.forEach((appUserPoint) => {
      this.appUserPointService.expirePoint(appUserPoint);
    });
  }
}
