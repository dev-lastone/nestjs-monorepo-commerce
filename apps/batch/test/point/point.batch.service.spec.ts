import { Test } from '@nestjs/testing';
import { PointBatchRepo } from '../../src/point/point.batch.repo';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import { PointBatchService } from '../../src/point/point.batch.service';
import { saveAppUserPointDtoStub } from '../../../../libs/domain/test/app-user/_stub/app-user-point.stub';

describe('PointBatchService', () => {
  let pointBatchService: PointBatchService;
  let appUserPointService: AppUserPointService;
  let pointBatchRepo: PointBatchRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        PointBatchService,
        {
          provide: AppUserPointService,
          useValue: {
            expirePoint: jest.fn(),
          },
        },
        {
          provide: PointBatchRepo,
          useValue: {
            findExpirationPoints: jest
              .fn()
              .mockResolvedValue([saveAppUserPointDtoStub]),
          },
        },
      ],
    }).compile();

    pointBatchService = testingModule.get(PointBatchService);
    appUserPointService = testingModule.get(AppUserPointService);
    pointBatchRepo = testingModule.get(PointBatchRepo);
  });

  it('expirePoint', async () => {
    await pointBatchService.expirePoint();

    expect(pointBatchRepo.findExpirationPoints).toHaveBeenCalled();
    expect(appUserPointService.expirePoint).toHaveBeenCalled();
  });
});
