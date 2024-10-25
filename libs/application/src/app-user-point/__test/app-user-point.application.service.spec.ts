import { AppUserPointApplicationService } from '@application/app-user-point/app-user-point.application.service';
import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { Test } from '@nestjs/testing';
import { AppUserPointApplicationRepo } from '@application/app-user-point/app-user-point.application.repo';
import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { NotFoundException } from '@nestjs/common';

describe('UserPointApplicationService', () => {
  let appUserPointApplicationService: AppUserPointApplicationService;
  let appUserPointApplicationRepo: AppUserPointApplicationRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AppUserPointApplicationService,
        {
          provide: AppUserPointApplicationRepo,
          useValue: {
            save: jest.fn(),
            findOneByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    appUserPointApplicationService = testingModule.get(
      AppUserPointApplicationService,
    );
    appUserPointApplicationRepo = testingModule.get(
      AppUserPointApplicationRepo,
    );
  });

  describe('savePoint', () => {
    it('404', () => {
      expect(() =>
        appUserPointApplicationService.savePoint(
          1,
          1000,
          AppUserPointHistoryAction.ORDER_PRODUCT,
          3,
        ),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('성공', async () => {
      const userPointStub = AppUserPoint.create(appUserStub);
      userPointStub.userId = appUserStub.id;

      jest
        .spyOn(appUserPointApplicationRepo, 'findOneByUserId')
        .mockResolvedValue(userPointStub);

      const userPoint = await appUserPointApplicationService.savePoint(
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
    const userPoint = AppUserPoint.create(appUserStub);
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
      .spyOn(appUserPointApplicationRepo, 'findOneByUserId')
      .mockResolvedValue(userPoint);

    const result = await appUserPointApplicationService.usePoint(
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
