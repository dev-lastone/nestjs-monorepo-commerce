import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { appUserStub } from './_stub/app-user.stub';
import { saveAppUserPointDtoStub } from './_stub/app-user-point.stub';
import { AppUserPointDto } from '@domain/app-user/dto/app-user-point.dto';
import { OrderProductPointStrategy } from '@domain/app-user/point/strategy/order-product-point.strategy';
import { orderProductStub } from '../order/_stub/order-product.stub';
import { OrderProduct } from '@domain/order/order-product.entity';

describe('AppUserPoint', () => {
  it('create', () => {
    const userPoint = AppUserPoint.create();
    expect(userPoint).toBeInstanceOf(AppUserPoint);
    expect(userPoint.point).toBe(0);
  });

  it('save', () => {
    const userPoint = AppUserPoint.create();
    const orderProductPointStrategy = new OrderProductPointStrategy(
      orderProductStub as OrderProduct,
    );
    expect(userPoint.save(orderProductPointStrategy)).toEqual({
      point: orderProductPointStrategy.point,
      action: orderProductPointStrategy.action,
      actionId: orderProductPointStrategy.actionId,
      remainingPoint: orderProductPointStrategy.point,
      storage: {
        point: orderProductPointStrategy.point,
        expirationAt: orderProductPointStrategy.expirationAt,
      },
    });
  });

  describe('use', () => {
    it(ERROR_MESSAGES.MinimumUsePoint, () => {
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

      expect(() =>
        userPoint.use({
          ...saveAppUserPointDtoStub,
          point: 99,
        }),
      ).toThrowError(ERROR_MESSAGES.MinimumUsePoint);
    });

    it(ERROR_MESSAGES.NotEnoughPoints, () => {
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

      expect(() =>
        userPoint.use({
          ...saveAppUserPointDtoStub,
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

      const dto = new AppUserPointDto();
      dto.point = 1000;
      dto.action = AppUserPointHistoryAction.ORDER;
      dto.actionId = 1;

      expect(userPoint.use(dto)).toEqual({
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

  it('expire', () => {
    const userPoint = AppUserPoint.create();
    userPoint.point = 1000;
    userPoint.histories = [
      {
        storage: {
          id: 1,
          point: 500,
        } as AppUserPointStorage,
      } as AppUserPointHistory,
      {
        storage: {
          id: 2,
          point: 500,
        } as AppUserPointStorage,
      } as AppUserPointHistory,
    ];

    expect(userPoint.expire()).toEqual({
      action: AppUserPointHistoryAction.EXPIRE,
      consumptions: [
        {
          point: 500,
          userPointStorageId: 1,
        },
        {
          point: 500,
          userPointStorageId: 2,
        },
      ],
      point: 1000,
      remainingPoint: 0,
    });
  });
});
