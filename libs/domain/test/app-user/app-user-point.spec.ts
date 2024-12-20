import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { appUserStub } from './_stub/app-user.stub';
import { appUserPointSaveDtoStub } from './_stub/app-user-point.stub';

describe('AppUserPoint', () => {
  it('create', () => {
    const userPoint = AppUserPoint.create();
    expect(userPoint).toBeInstanceOf(AppUserPoint);
    expect(userPoint.point).toBe(0);
  });

  const expirationAt = new Date();
  expirationAt.setDate(expirationAt.getDate() + 7);

  it('save', () => {
    const userPoint = AppUserPoint.create();
    expect(userPoint.save(appUserPointSaveDtoStub, expirationAt)).toEqual({
      ...appUserPointSaveDtoStub,
      remainingPoint: appUserPointSaveDtoStub.point,
      storage: {
        point: appUserPointSaveDtoStub.point,
        expirationAt,
      },
    });
  });

  describe('use', () => {
    it(ERROR_MESSAGES.NotEnoughPoints, () => {
      const userPoint = AppUserPoint.create();
      userPoint.save(appUserPointSaveDtoStub, expirationAt);

      expect(() =>
        userPoint.use({
          ...appUserPointSaveDtoStub,
          point: 1001,
        }),
      ).toThrowError(ERROR_MESSAGES.NotEnoughPoints);
    });

    it('성공 - 단일 사용', () => {
      const userPoint = AppUserPoint.create();
      userPoint.userId = appUserStub.id;
      userPoint.point = 1000;
      userPoint.histories = [
        {
          remainingPoint: 1000,
          storage: {
            id: 1,
            point: 1000,
          } as AppUserPointStorage,
        } as AppUserPointHistory,
      ];

      expect(
        userPoint.use({
          point: 1000,
          action: AppUserPointHistoryAction.ORDER,
          actionId: 1,
        }),
      ).toEqual({
        action: AppUserPointHistoryAction.ORDER,
        actionId: 1,
        consumptions: [
          {
            point: 1000,
            userPointStorageId: 1,
          },
        ],
        point: 1000,
        remainingPoint: 0,
      });
    });

    it('성공 - 다중 사용', () => {
      const userPoint = AppUserPoint.create();
      userPoint.point = 2000;
      userPoint.histories = [
        {
          remainingPoint: 1000,
          storage: {
            id: 1,
            point: 1000,
          } as AppUserPointStorage,
        } as AppUserPointHistory,
        {
          remainingPoint: 1000,
          storage: {
            id: 2,
            point: 1000,
          } as AppUserPointStorage,
        } as AppUserPointHistory,
      ];

      expect(
        userPoint.use({
          action: AppUserPointHistoryAction.ORDER,
          actionId: 1,
          point: 1500,
        }),
      ).toEqual({
        action: AppUserPointHistoryAction.ORDER,
        actionId: 1,
        consumptions: [
          {
            point: 1000,
            userPointStorageId: 1,
          },
          {
            point: 500,
            userPointStorageId: 2,
          },
        ],
        point: 1500,
        remainingPoint: 500,
      });
    });
  });
});
