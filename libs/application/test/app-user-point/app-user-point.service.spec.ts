import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { Test } from '@nestjs/testing';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';
import { appUserStub } from '../../../domain/test/app-user/_stub/app-user.stub';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { ReviewPointStrategy } from '@domain/app-user/point/strategy/review-point.strategy';
import { OrderProduct } from '@domain/order/order-product.entity';
import { OrderProductPointStrategy } from '@domain/app-user/point/strategy/order-product-point.strategy';
import { orderProductWithOrderAndProductStub } from '../../../domain/test/order/_stub/order-product.stub';
import { configModule } from '@common/setting/config';
import { typeOrmSetting } from '@common/setting/type-orm.setting';

describe('UserPointService', () => {
  let appUserPointService: AppUserPointService;
  let appUserPointRepo: AppUserPointRepo;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [configModule(), typeOrmSetting()],
      providers: [
        AppUserPointService,
        {
          provide: AppUserPointRepo,
          useValue: {
            save: jest.fn(),
            saveHistory: jest.fn(),
            findOneByUserId: jest.fn(),
            getUserPointWithAvailablePoints: jest.fn(),
          },
        },
      ],
    }).compile();

    appUserPointService = testingModule.get(AppUserPointService);
    appUserPointRepo = testingModule.get(AppUserPointRepo);
  });

  describe('savePoint', () => {
    it('savePoint', async () => {
      const userPointStub = AppUserPoint.create();
      userPointStub.userId = appUserStub.id;

      const orderProductPointStrategy = new OrderProductPointStrategy(
        orderProductWithOrderAndProductStub as OrderProduct,
      );
      // TODO 개선필요
      const expirationAt = orderProductPointStrategy.expirationAt;

      jest
        .spyOn(appUserPointRepo, 'findOneByUserId')
        .mockResolvedValue(userPointStub);
      jest.spyOn(appUserPointRepo, 'saveHistory').mockResolvedValue({
        id: 1,
        point: orderProductPointStrategy.point,
        remainingPoint: orderProductPointStrategy.point,
        action: orderProductPointStrategy.action,
        actionId: orderProductPointStrategy.actionId,
        storage: {
          expirationAt,
        },
      } as AppUserPointHistory);

      const userPoint = await appUserPointService.savePoint(
        orderProductPointStrategy,
      );

      expect(userPoint).toEqual({
        point: orderProductPointStrategy.point,
        history: {
          id: 1,
          point: orderProductPointStrategy.point,
          remainingPoint: orderProductPointStrategy.point,
          action: orderProductPointStrategy.action,
          actionId: orderProductPointStrategy.actionId,
          storage: {
            expirationAt,
          },
        },
      });
    });

    it('review', async () => {
      const review = new OrderProductReview();
      const strategy = new ReviewPointStrategy(review);
      jest.spyOn(appUserPointService, 'savePoint').mockResolvedValue(null);

      await appUserPointService.savePointByReview(review);

      expect(appUserPointService.savePoint).toHaveBeenCalledWith(strategy);
    });

    it('orderProduct', async () => {
      const orderProduct = new OrderProduct();
      const strategy = new OrderProductPointStrategy(orderProduct);
      jest.spyOn(appUserPointService, 'savePoint').mockResolvedValue(null);

      await appUserPointService.savePointByOrderProduct(orderProduct);

      expect(appUserPointService.savePoint).toHaveBeenCalledWith(strategy);
    });
  });

  it('usePoint', async () => {
    const userPoint = AppUserPoint.create();
    userPoint.userId = appUserStub.id;
    userPoint.point = 1000;
    userPoint.histories = [
      {
        remainingPoint: 1000,
        storage: {
          point: 1000,
        } as AppUserPointStorage,
      } as AppUserPointHistory,
    ];

    const usePointDto = {
      point: 1000,
      action: AppUserPointHistoryAction.ORDER,
      actionId: 1,
    };

    jest
      .spyOn(appUserPointRepo, 'getUserPointWithAvailablePoints')
      .mockResolvedValue(userPoint);
    jest.spyOn(appUserPointRepo, 'saveHistory').mockResolvedValue({
      id: 1,
      remainingPoint: 0,
      ...usePointDto,
    } as AppUserPointHistory);

    const result = await appUserPointService.usePoint(
      appUserStub.id,
      usePointDto,
    );

    expect(result).toEqual({
      point: 0,
      history: {
        id: 1,
        remainingPoint: 0,
        ...usePointDto,
      },
    });
  });

  it('expirePoint', async () => {
    const userPoint = AppUserPoint.create();
    userPoint.userId = appUserStub.id;
    userPoint.point = 1000;
    userPoint.histories = [
      {
        remainingPoint: 1000,
        storage: {
          point: 1000,
        } as AppUserPointStorage,
      } as AppUserPointHistory,
    ];

    jest.spyOn(appUserPointRepo, 'saveHistory').mockResolvedValue(null);

    await appUserPointService.expirePoint(userPoint);

    expect(userPoint.point).toBe(0);
    expect(userPoint.histories[0].storage.point).toBe(0);
  });
});
