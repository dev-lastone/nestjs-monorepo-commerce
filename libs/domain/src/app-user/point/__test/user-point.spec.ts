import { AppUserPoint, AppUserPointHistoryAction } from '../app-user-point';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

describe('UserPoint', () => {
  it('save', () => {
    const userPoint = new AppUserPoint(1);

    expect(
      userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1),
    ).toEqual({
      userId: 1,
      id: 1,
      action: AppUserPointHistoryAction.ORDER_PRODUCT,
      actionId: 1,
      point: 1000,
      remainingPoint: 1000,
      storage: {
        id: 1,
        point: 1000,
        userPointHistoryId: 1,
      },
    });
  });

  describe('use', () => {
    it(ERROR_MESSAGES.NotEnoughPoints, () => {
      const userPoint = new AppUserPoint(1);
      userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1);

      expect(() =>
        userPoint.use(1001, AppUserPointHistoryAction.ORDER, 1),
      ).toThrowError(ERROR_MESSAGES.NotEnoughPoints);
    });

    it('성공 - 단일 사용', () => {
      const userPoint = new AppUserPoint(1);
      userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1);

      expect(userPoint.use(1000, AppUserPointHistoryAction.ORDER, 1)).toEqual({
        userId: 1,
        id: 2,
        point: 1000,
        remainingPoint: 0,
        action: AppUserPointHistoryAction.ORDER,
        actionId: 1,
        consumptions: [
          {
            userPointHistoryId: 2,
            userPointStorageId: 1,
            point: 0,
          },
        ],
      });
    });

    it('성공 - 다중 사용', () => {
      const userPoint = new AppUserPoint(1);
      userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1);
      userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 2);

      expect(userPoint.use(1500, AppUserPointHistoryAction.ORDER, 1)).toEqual({
        userId: 1,
        id: 3,
        point: 1500,
        remainingPoint: 500,
        action: AppUserPointHistoryAction.ORDER,
        actionId: 1,
        consumptions: [
          {
            userPointHistoryId: 3,
            userPointStorageId: 1,
            point: 0,
          },
          {
            userPointHistoryId: 3,
            userPointStorageId: 2,
            point: 500,
          },
        ],
      });
    });
  });
});
