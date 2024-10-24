import { Injectable } from '@nestjs/common';
import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointApplicationRepo } from '@application/app-user-point/app-user-point.application.repo';

@Injectable()
export class AppUserPointApplicationService {
  constructor(
    private readonly appUserPointApplicationRepo: AppUserPointApplicationRepo,
  ) {}

  async savePoint(
    userId: number,
    point: number,
    action: AppUserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint = await this.#getUserPoint(userId);
    const history = userPoint.save(point, action, actionId);

    await this.appUserPointApplicationRepo.save(userPoint);

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
    const userPoint =
      await this.appUserPointApplicationRepo.findOneByUserId(userId);

    if (userPoint) {
      return userPoint;
    }

    const newUserPoint = new AppUserPoint(userId);
    await this.appUserPointApplicationRepo.save(newUserPoint);
    return newUserPoint;
  }
}
