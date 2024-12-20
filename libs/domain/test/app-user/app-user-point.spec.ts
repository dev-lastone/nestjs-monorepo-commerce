import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { userStub } from '../user/stub/user.stub';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { appUserStub } from './_stub/app-user.stub';

describe('AppUserPoint', () => {
  it('create', () => {
    const userPoint = AppUserPoint.create();
    expect(userPoint).toBeInstanceOf(AppUserPoint);
    expect(userPoint.point).toBe(0);
  });

  it('save', () => {
    const userPoint = AppUserPoint.create();
    userPoint.userId = userStub.id;

    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 7);

    expect(
      userPoint.save(
        {
          point: 1000,
          action: AppUserPointHistoryAction.ORDER_PRODUCT,
          actionId: 1,
        },
        expirationAt,
      ),
    ).toEqual({
      action: AppUserPointHistoryAction.ORDER_PRODUCT,
      actionId: 1,
      point: 1000,
      remainingPoint: 1000,
      storage: {
        point: 1000,
        expirationAt,
      },
    });
  });

  describe('use', () => {
    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 7);

    it(ERROR_MESSAGES.NotEnoughPoints, () => {
      const userPoint = AppUserPoint.create();
      userPoint.save(
        {
          point: 1000,
          action: AppUserPointHistoryAction.ORDER_PRODUCT,
          actionId: 1,
        },
        expirationAt,
      );

      expect(() =>
        userPoint.use({
          point: 1001,
          action: AppUserPointHistoryAction.ORDER,
          actionId: 1,
        }),
      ).toThrowError(ERROR_MESSAGES.NotEnoughPoints);
    });

    it('성공 - 단일 사용', () => {
      const upsertedAt = new Date();

      const userPoint = AppUserPoint.create();
      userPoint.userId = appUserStub.id;
      userPoint.point = 1000;
      userPoint.histories = [
        {
          id: 2,
          userPointId: 1,
          point: 1000,
          remainingPoint: 1000,
          action: AppUserPointHistoryAction.ORDER,
          actionId: 1,
          storage: {
            id: 1,
            userPointHistoryId: 2,
            point: 1000,
            expirationAt: upsertedAt,
          } as AppUserPointStorage,
          createdAt: upsertedAt,
          updatedAt: upsertedAt,
        } as AppUserPointHistory,
      ];

      expect(
        userPoint.use({
          point: 1000,
          action: AppUserPointHistoryAction.ORDER,
          actionId: 1,
        }),
      ).toEqual({
        action: 'order',
        actionId: 1,
        consumptions: [
          {
            point: 1000,
            userPointHistoryId: 2,
            userPointStorageId: 1,
          },
        ],
        point: 1000,
        remainingPoint: 0,
      });
    });

    it('성공 - 다중 사용', () => {
      const upsertedAt = new Date();

      const userPoint = AppUserPoint.create();
      userPoint.userId = appUserStub.id;
      userPoint.point = 2000;
      userPoint.histories = [
        {
          id: 2,
          userPointId: 1,
          point: 1000,
          remainingPoint: 1000,
          action: AppUserPointHistoryAction.ORDER,
          actionId: 1,
          storage: {
            id: 1,
            userPointHistoryId: 2,
            point: 1000,
            expirationAt: upsertedAt,
          } as AppUserPointStorage,
          createdAt: upsertedAt,
          updatedAt: upsertedAt,
        } as AppUserPointHistory,
        {
          id: 3,
          userPointId: 1,
          point: 1000,
          remainingPoint: 1000,
          action: AppUserPointHistoryAction.ORDER,
          actionId: 2,
          storage: {
            id: 1,
            userPointHistoryId: 2,
            point: 1000,
            expirationAt: upsertedAt,
          } as AppUserPointStorage,
          createdAt: upsertedAt,
          updatedAt: upsertedAt,
        } as AppUserPointHistory,
      ];

      expect(
        userPoint.use({
          point: 1500,
          action: AppUserPointHistoryAction.ORDER,
          actionId: 1,
        }),
      ).toEqual({
        action: 'order',
        actionId: 1,
        consumptions: [
          {
            point: 1000,
            userPointHistoryId: 2,
            userPointStorageId: 1,
          },
          {
            point: 500,
            userPointHistoryId: 3,
            userPointStorageId: 1,
          },
        ],
        point: 1500,
        remainingPoint: 500,
      });
    });
  });
});
