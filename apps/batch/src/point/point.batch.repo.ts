import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';

@Injectable()
export class PointBatchRepo {
  constructor(
    @InjectRepository(AppUserPoint)
    private readonly appUserPointBatchRepo: Repository<AppUserPoint>,
  ) {}

  async findExpirationPoints() {
    return await this.appUserPointBatchRepo.find({
      relations: ['histories', 'histories.storage'],
      where: {
        histories: {
          storage: {
            point: MoreThan(0),
            expirationAt: LessThan(new Date()),
          },
        },
      },
    });
  }
}
