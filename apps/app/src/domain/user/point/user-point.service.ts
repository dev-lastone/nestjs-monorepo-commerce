import { BadRequestException, Injectable } from '@nestjs/common';
import {
  UserPoint,
  UserPointHistory,
  UserPointHistoryAction,
} from './user-point';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

@Injectable()
export class UserPointService {
  #userPoints: UserPoint[] = [
    {
      userId: 1,
      point: 2000,
    },
  ];

  #userPointHistories: UserPointHistory[] = [
    {
      userId: 1,
      id: 1,
      action: UserPointHistoryAction.ORDER_PRODUCT,
      actionId: 1,
      point: 1000,
      remainingPoint: 1000,
    },
    {
      userId: 1,
      id: 2,
      action: UserPointHistoryAction.ORDER_PRODUCT,
      actionId: 2,
      point: 1000,
      remainingPoint: 1000,
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
    userPointHistory.remainingPoint = point;

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

    if (point > userPoint.point) {
      throw new BadRequestException(ERROR_MESSAGES.NotEnoughPoints);
    }

    userPoint.point -= point;

    const userPointHistory = new UserPointHistory();
    userPointHistory.userId = userId;
    userPointHistory.id = this.#userPointHistories.length + 1;
    userPointHistory.action = action;
    userPointHistory.actionId = actionId;
    userPointHistory.point = point;
    userPointHistory.remainingPoint = 0;

    this.#userPoints.push(userPoint);
    this.#userPointHistories.push(userPointHistory);

    return userPointHistory;
  }
}
