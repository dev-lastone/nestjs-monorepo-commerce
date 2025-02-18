import { Injectable } from '@nestjs/common';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';
import { AppUserPointDto } from '@domain/app-user/dto/app-user-point.dto';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { OrderProduct } from '@domain/order/order-product.entity';
import { ReviewPointStrategy } from '@domain/app-user/point/strategy/review-point.strategy';
import { OrderProductPointStrategy } from '@domain/app-user/point/strategy/order-product-point.strategy';
import { PointStrategy } from '@domain/app-user/point/strategy/point.strategy';
import { AppUserPoint } from '@domain/app-user/point/app-user-point.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AppUserPointService {
  constructor(private readonly appUserPointRepo: AppUserPointRepo) {}

  async savePointByReview(review: OrderProductReview) {
    const strategy = new ReviewPointStrategy(review);
    return await this.savePoint(strategy);
  }

  async savePointByOrderProduct(orderProduct: OrderProduct) {
    const strategy = new OrderProductPointStrategy(orderProduct);
    return await this.savePoint(strategy);
  }

  async savePoint(dto: PointStrategy) {
    const userPoint = await this.appUserPointRepo.findOneByUserId(dto.userId);

    const appUserPointHistory = userPoint.save(dto);

    await this.appUserPointRepo.save(userPoint);
    const createAppUserPointHistory =
      await this.appUserPointRepo.saveHistory(appUserPointHistory);

    return {
      point: userPoint.point,
      history: {
        id: createAppUserPointHistory.id,
        point: createAppUserPointHistory.point,
        remainingPoint: createAppUserPointHistory.remainingPoint,
        action: createAppUserPointHistory.action,
        actionId: createAppUserPointHistory.actionId,
        storage: {
          expirationAt: createAppUserPointHistory.storage.expirationAt,
        },
      },
    };
  }

  async usePoint(userId: number, dto: AppUserPointDto) {
    const userPoint =
      await this.appUserPointRepo.getUserPointWithAvailablePoints(userId);

    const appUserPointHistory = userPoint.use(dto);

    await this.appUserPointRepo.save(userPoint);
    const createAppUserPointHistory =
      await this.appUserPointRepo.saveHistory(appUserPointHistory);

    return {
      point: userPoint.point,
      history: {
        id: createAppUserPointHistory.id,
        point: createAppUserPointHistory.point,
        remainingPoint: createAppUserPointHistory.remainingPoint,
        action: createAppUserPointHistory.action,
        actionId: createAppUserPointHistory.actionId,
      },
    };
  }

  @Transactional()
  async expirePoint(appUserPoint: AppUserPoint) {
    const appUserPointHistory = appUserPoint.expire();

    await this.appUserPointRepo.save(appUserPoint);
    await this.appUserPointRepo.saveHistory(appUserPointHistory);
  }
}
