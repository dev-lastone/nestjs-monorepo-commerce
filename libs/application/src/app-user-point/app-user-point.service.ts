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
    const history = userPoint.save(point, action, actionId);

    await this.appUserPointRepo.save(userPoint);

    return {
      point: userPoint.point,
      history: {
        userId: history.userId,
        id: history.id,
        point: history.point,
        remainingPoint: history.remainingPoint,
        action: history.action,
        actionId: history.actionId,
      },
    };
  }

  async usePoint(
    userId: number,
    point: number,
    action: AppUserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint = await this.#getUserPoint(userId);

    const history = userPoint.use(point, action, actionId);

    return {
      point: userPoint.point,
      history: {
        id: history.id,
        userId: history.userId,
        point: history.point,
        remainingPoint: history.remainingPoint,
        action: history.action,
        actionId: history.actionId,
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
