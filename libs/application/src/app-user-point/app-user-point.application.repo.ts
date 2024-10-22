import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';

@Injectable()
export class AppUserPointApplicationRepo {
  constructor(
    @InjectRepository(AppUserPoint)
    private readonly appUserPointRepo: Repository<AppUserPoint>,
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
