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
      histories: [
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
          remainingPoint: 2000,
        },
      ],
    },
  ];

  savePoint(
    userId: number,
    point: number,
    action: UserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint =
      this.#userPoints.find((userPoint) => userPoint.userId === userId) ??
      new UserPoint();

    if (userPoint.point) {
      userPoint.point += point;
    } else {
      userPoint.point = point;
    }

    const userPointHistory = new UserPointHistory();
    userPointHistory.userId = userId;
    userPointHistory.id = userPoint.histories
      ? userPoint.histories.length + 1
      : 1;
    userPointHistory.action = action;
    userPointHistory.actionId = actionId;
    userPointHistory.point = point;
    userPointHistory.remainingPoint = userPoint.point;
    userPoint.histories.push(userPointHistory);

    return {
      point: userPoint.point,
      history: {
        ...userPointHistory,
      },
    };
  }

  usePoint(
    userId: number,
    point: number,
    action: UserPointHistoryAction,
    actionId: number,
  ) {
    const userPoint = this.#userPoints.find(
      (userPoint) => userPoint.userId === userId,
    );

    if (!userPoint || userPoint.point < point) {
      throw new BadRequestException(ERROR_MESSAGES.NotEnoughPoints);
    }

    userPoint.point -= point;

    const userPointHistory = new UserPointHistory();
    userPointHistory.userId = userId;
    userPointHistory.id = userPoint.histories.length + 1;
    userPointHistory.action = action;
    userPointHistory.actionId = actionId;
    userPointHistory.point = point;
    userPointHistory.remainingPoint = userPoint.point;
    userPoint.histories.push(userPointHistory);

    return {
      point: userPoint.point,
      history: {
        ...userPointHistory,
      },
    };
  }
}
