import { Injectable } from '@nestjs/common';
import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { userPointStubs } from '@domain/app-user/point/__stub/user-point.stub';

@Injectable()
export class AppUserPointApplicationService {
  #userPoints: AppUserPoint[] = userPointStubs;

  savePoint(
    userId: number,
    point: number,
    action: AppUserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint = this.#getUserPoint(userId);
    const history = userPoint.save(point, action, actionId);

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

  usePoint(
    userId: number,
    point: number,
    action: AppUserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint = this.#getUserPoint(userId);
    const history = userPoint.use(point, action, actionId);

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

  #getUserPoint(userId: number) {
    const userPoint = this.#userPoints.find(
      (userPoint) => userPoint.userId === userId,
    );

    if (userPoint) {
      return userPoint;
    }

    const newUserPoint = new AppUserPoint(userId);
    this.#userPoints.push(newUserPoint);
    return newUserPoint;
  }
}
