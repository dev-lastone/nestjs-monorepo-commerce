import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import {
  AppUserPoint,
  AppUserPointHistoryAction,
} from '@domain/app-user/point/app-user-point.entity';
import { Test } from '@nestjs/testing';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';
import { NotFoundException } from '@nestjs/common';
import { appUserStub } from '../../../domain/test/app-user/_stub/app-user.stub';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { saveAppUserPointDtoStub } from '../../../domain/test/app-user/_stub/app-user-point.stub';
import { NON_EXISTENT_ID } from '@common/constant/constants';

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
    it('404', () => {
      expect(() =>
        appUserPointService.savePoint({
          ...saveAppUserPointDtoStub,
          userId: NON_EXISTENT_ID,
        }),
      ).rejects.toThrowError(new NotFoundException());
    });

    it('성공', async () => {
      const userPointStub = AppUserPoint.create();
      userPointStub.userId = appUserStub.id;

      jest
        .spyOn(appUserPointRepo, 'findOneByUserId')
        .mockResolvedValue(userPointStub);
      jest.spyOn(appUserPointRepo, 'saveHistory').mockResolvedValue({
        id: 1n,
        point: saveAppUserPointDtoStub.point,
        remainingPoint: saveAppUserPointDtoStub.point,
        action: saveAppUserPointDtoStub.action,
        actionId: saveAppUserPointDtoStub.actionId,
        storage: {
          expirationAt: saveAppUserPointDtoStub.expirationAt,
        },
      } as AppUserPointHistory);

      const userPoint = await appUserPointService.savePoint(
        saveAppUserPointDtoStub,
      );

      expect(userPoint).toEqual({
        point: saveAppUserPointDtoStub.point,
        history: {
          id: 1n,
          point: saveAppUserPointDtoStub.point,
          remainingPoint: saveAppUserPointDtoStub.point,
          action: saveAppUserPointDtoStub.action,
          actionId: saveAppUserPointDtoStub.actionId,
          storage: {
            expirationAt: saveAppUserPointDtoStub.expirationAt,
          },
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
        remainingPoint: 1000,
        storage: {
          point: 1000,
        } as AppUserPointStorage,
      } as AppUserPointHistory,
    ];

    const usePointDto = {
      point: 1000,
      action: AppUserPointHistoryAction.ORDER,
      actionId: 1n,
    };

    jest
      .spyOn(appUserPointRepo, 'getUserPointWithAvailablePoints')
      .mockResolvedValue(userPoint);
    jest.spyOn(appUserPointRepo, 'saveHistory').mockResolvedValue({
      id: 1n,
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
        id: 1n,
        remainingPoint: 0,
        ...usePointDto,
      },
    });
  });
});
