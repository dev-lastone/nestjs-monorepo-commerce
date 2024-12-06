import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { Test } from '@nestjs/testing';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';
import { NotFoundException } from '@nestjs/common';
import { appUserStub } from '../../../domain/test/app-user/_stub/app-user.stub';

describe('UserPointService', () => {
  let appUserPointService: AppUserPointService;
  let appUserPointRepo: AppUserPointRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AppUserPointService,
        {
          provide: AppUserPointRepo,
          useValue: {
            save: jest.fn(),
            findOneByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    appUserPointService = testingModule.get(AppUserPointService);
    appUserPointRepo = testingModule.get(AppUserPointRepo);
  });

  describe('savePoint', () => {
    it('404', () => {
      expect(() =>
        appUserPointService.savePoint(
          1,
          1000,
          AppUserPointHistoryAction.ORDER_PRODUCT,
          3,
        ),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('성공', async () => {
      const userPointStub = AppUserPoint.create();
      userPointStub.userId = appUserStub.id;

      jest
        .spyOn(appUserPointRepo, 'findOneByUserId')
        .mockResolvedValue(userPointStub);

      const userPoint = await appUserPointService.savePoint(
        1,
        1000,
        AppUserPointHistoryAction.ORDER_PRODUCT,
        3,
      );
      expect(userPoint).toEqual({
        point: 1000,
        history: {
          id: 1,
          userId: 1,
          point: 1000,
          remainingPoint: 1000,
          action: AppUserPointHistoryAction.ORDER_PRODUCT,
          actionId: 3,
        },
      });
    });
  });

  it('usePoint', async () => {
    const userPoint = AppUserPoint.create();
    userPoint.userId = appUserStub.id;
    userPoint.point = 1000;
    userPoint.histories = [
      {
        userId: 1,
        id: 2,
        point: 1000,
        remainingPoint: 1000,
        action: AppUserPointHistoryAction.ORDER,
        actionId: 1,
        storage: {
          id: 1,
          userPointHistoryId: 2,
          point: 1000,
        },
      },
    ];

    jest
      .spyOn(appUserPointRepo, 'findOneByUserId')
      .mockResolvedValue(userPoint);

    const result = await appUserPointService.usePoint(
      1,
      1000,
      AppUserPointHistoryAction.ORDER,
      1,
    );

    expect(result).toEqual({
      point: 0,
      history: {
        userId: 1,
        id: 2,
        point: 1000,
        remainingPoint: 0,
        action: AppUserPointHistoryAction.ORDER,
        actionId: 1,
      },
    });
  });
});
