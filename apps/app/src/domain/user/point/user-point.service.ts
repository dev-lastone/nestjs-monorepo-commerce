import { Injectable } from '@nestjs/common';
import {
  UserPoint,
  UserPointHistory,
  UserPointHistoryAction,
} from './user-point';

@Injectable()
export class UserPointService {
  #userPoints: UserPoint[] = [
    {
      userId: 1,
      point: 1000,
    },
  ];

  #userPointHistories: UserPointHistory[] = [
    {
      userId: 1,
      id: 1,
      action: UserPointHistoryAction.ORDER_PRODUCT,
      actionId: 1,
      point: 1000,
    },
  ];

  savePoint(
    userId: number,
    point: number,
    action: UserPointHistoryAction,
    actionId: number,
  ): UserPoint {
    const userPoint =
      this.#userPoints.find((userPoint) => userPoint.userId === userId) ??
      new UserPoint();

    userPoint.point += point;

    const userPointHistory = new UserPointHistory();
    userPointHistory.userId = userId;
    userPointHistory.id = this.#userPointHistories.length + 1;
    userPointHistory.action = action;
    userPointHistory.actionId = actionId;
    userPointHistory.point = point;

    this.#userPoints.push(userPoint);
    this.#userPointHistories.push(userPointHistory);

    return userPointHistory;
  }

  usePoint(
    userId: number,
    point: number,
    action: UserPointHistoryAction,
    actionId: number,
  ): UserPoint {
    const userPoint = this.#userPoints.find(
      (userPoint) => userPoint.userId === userId,
    );

    userPoint.point -= point;

    const userPointHistory = new UserPointHistory();
    userPointHistory.userId = userId;
    userPointHistory.id = this.#userPointHistories.length + 1;
    userPointHistory.action = action;
    userPointHistory.actionId = actionId;
    userPointHistory.point = point;

    this.#userPoints.push(userPoint);
    this.#userPointHistories.push(userPointHistory);

    return userPointHistory;
  }
}
