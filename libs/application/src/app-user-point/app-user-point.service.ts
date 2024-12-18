import { Injectable, NotFoundException } from '@nestjs/common';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';

@Injectable()
export class AppUserPointService {
  constructor(private readonly appUserPointRepo: AppUserPointRepo) {}

  async savePoint(
    userId: number,
    point: number,
    action: AppUserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint = await this.#getUserPoint(userId);

    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 7);
    const appUserPointHistory = userPoint.save(
      point,
      action,
      actionId,
      expirationAt,
    );

    await this.appUserPointRepo.save(userPoint);
    const createAppUserPointHistory =
      await this.appUserPointRepo.saveHistory(appUserPointHistory);

    return {
      point: userPoint.point,
      history: {
        id: createAppUserPointHistory.id,
        point: createAppUserPointHistory.point,
        remainingPoint: createAppUserPointHistory.remainingPoint,
        action: createAppUserPointHistory.action,
        actionId: createAppUserPointHistory.actionId,
      },
    };
  }

  async usePoint(
    userId: number,
    point: number,
    action: AppUserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint =
      await this.appUserPointRepo.getUserPointWithAvailablePoints(userId);

    const appUserPointHistory = userPoint.use(point, action, actionId);

    await this.appUserPointRepo.save(userPoint);
    const createAppUserPointHistory =
      await this.appUserPointRepo.saveHistory(appUserPointHistory);

    return {
      point: userPoint.point,
      history: {
        id: createAppUserPointHistory.id,
        point: createAppUserPointHistory.point,
        remainingPoint: createAppUserPointHistory.remainingPoint,
        action: createAppUserPointHistory.action,
        actionId: createAppUserPointHistory.actionId,
      },
    };
  }

  async #getUserPoint(userId: number) {
    const userPoint = await this.appUserPointRepo.findOneByUserId(userId);

    if (!userPoint) {
      throw new NotFoundException();
    }

    return userPoint;
  }
}
