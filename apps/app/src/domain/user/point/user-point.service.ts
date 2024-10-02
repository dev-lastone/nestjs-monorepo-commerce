import { Injectable } from '@nestjs/common';
import { UserPoint, UserPointActionType } from './user-point';

@Injectable()
export class UserPointService {
  #userPoints: UserPoint[] = [
    {
      userId: 1,
      id: 1,
      point: 1000,
      actionType: UserPointActionType.ORDER_PRODUCT,
      actionId: 1,
    },
  ];

  savePoint(
    userId: number,
    point: number,
    actionType: UserPointActionType,
    actionId: number,
  ): UserPoint {
    const userPoint: UserPoint = {
      userId,
      id: this.#userPoints.length + 1,
      point,
      actionType,
      actionId,
    };
    this.#userPoints.push(userPoint);
    return userPoint;
  }
}
