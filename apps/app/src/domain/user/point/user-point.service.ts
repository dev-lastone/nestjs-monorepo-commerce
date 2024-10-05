import { Injectable } from '@nestjs/common';
import { UserPoint, UserPointHistoryAction } from './user-point';
import { userPoints } from './__stub/user-point';

@Injectable()
export class UserPointService {
  #userPoints: UserPoint[] = userPoints;

  savePoint(
    userId: number,
    point: number,
    action: UserPointHistoryAction,
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
    action: UserPointHistoryAction,
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
    return (
      this.#userPoints.find((userPoint) => userPoint.userId === userId) ??
      new UserPoint(userId)
    );
  }
}
