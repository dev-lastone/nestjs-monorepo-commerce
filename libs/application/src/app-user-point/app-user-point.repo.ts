import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointHistory } from '@domain/app-user/point/app-user-point-history.entity';
import { AppUserPointStorage } from '@domain/app-user/point/app-user-point-storage.entity';
import { AppUserPointConsumption } from '@domain/app-user/point/app-user-point-consumption.entity';

@Injectable()
export class AppUserPointRepo {
  constructor(
    @InjectRepository(AppUserPoint)
    private readonly appUserPointRepo: Repository<AppUserPoint>,
    @InjectRepository(AppUserPointHistory)
    private readonly appUserPointHistoryRepo: Repository<AppUserPointHistory>,
    @InjectRepository(AppUserPointStorage)
    private readonly appUserPointStorageRepo: Repository<AppUserPointStorage>,
    @InjectRepository(AppUserPointConsumption)
    private readonly appUserPointConsumptionRepo: Repository<AppUserPointConsumption>,
  ) {}

  async save(appUserPoint: AppUserPoint) {
    return await this.appUserPointRepo.save(appUserPoint);
  }

  async findOneByUserId(userId: number) {
    return await this.appUserPointRepo.findOne({
      where: {
        userId,
      },
    });
  }
}
