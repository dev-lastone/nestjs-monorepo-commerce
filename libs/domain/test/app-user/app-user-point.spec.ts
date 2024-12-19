import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { userStub } from '../user/stub/user.stub';

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

  // describe('use', () => {
  //   it(ERROR_MESSAGES.NotEnoughPoints, () => {
  //     const userPoint = AppUserPoint.create();
  //     userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1);
  //
  //     expect(() =>
  //       userPoint.use(1001, AppUserPointHistoryAction.ORDER, 1),
  //     ).toThrowError(ERROR_MESSAGES.NotEnoughPoints);
  //   });
  //
  //   it('성공 - 단일 사용', () => {
  //     const userPoint = AppUserPoint.create();
  //     userPoint.userId = userStub.id;
  //     userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1);
  //
  //     expect(userPoint.use(1000, AppUserPointHistoryAction.ORDER, 1)).toEqual({
  //       id: 2,
  //       userId: 1,
  //       point: 1000,
  //       remainingPoint: 0,
  //       action: AppUserPointHistoryAction.ORDER,
  //       actionId: 1,
  //       consumptions: [
  //         {
  //           userPointHistoryId: 2,
  //           userPointStorageId: 1,
  //           point: 0,
  //         },
  //       ],
  //     });
  //   });
  //
  //   it('성공 - 다중 사용', () => {
  //     const userPoint = AppUserPoint.create();
  //     userPoint.userId = userStub.id;
  //     userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 1);
  //     userPoint.save(1000, AppUserPointHistoryAction.ORDER_PRODUCT, 2);
  //
  //     expect(userPoint.use(1500, AppUserPointHistoryAction.ORDER, 1)).toEqual({
  //       id: 3,
  //       userId: 1,
  //       point: 1500,
  //       remainingPoint: 500,
  //       action: AppUserPointHistoryAction.ORDER,
  //       actionId: 1,
  //       consumptions: [
  //         {
  //           userPointHistoryId: 3,
  //           userPointStorageId: 1,
  //           point: 0,
  //         },
  //         {
  //           userPointHistoryId: 3,
  //           userPointStorageId: 2,
  //           point: 500,
  //         },
  //       ],
  //     });
  //   });
  // });
});
