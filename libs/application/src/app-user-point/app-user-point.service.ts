import { Injectable, NotFoundException } from '@nestjs/common';
import { AppUserPointRepo } from '@application/app-user-point/app-user-point.repo';
import {
  AppUserPointDto,
  SaveAppUserPointDto,
} from '@domain/app-user/dto/app-user-point.dto';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { OrderProduct } from '@domain/order/order-product.entity';

@Injectable()
export class AppUserPointService {
  constructor(private readonly appUserPointRepo: AppUserPointRepo) {}

  async savePointByReview(review: OrderProductReview) {
    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 100);

    return await this.savePoint({
      userId: review.orderProduct.order.userId,
      point: 1000,
      action: AppUserPointHistoryAction.REVIEW,
      actionId: review.id,
      expirationAt,
    });
  }

  async savePointByOrderProduct(orderProduct: OrderProduct) {
    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 365);

    const point = orderProduct.product.price * 0.01;

    return await this.savePoint({
      userId: orderProduct.order.userId,
      point,
      action: AppUserPointHistoryAction.ORDER_PRODUCT,
      actionId: orderProduct.id,
      expirationAt,
    });
  }

  async savePoint(dto: SaveAppUserPointDto) {
    const userPoint = await this.appUserPointRepo.findOneByUserId(dto.userId);

    if (!userPoint) {
      throw new NotFoundException();
    }

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

  async usePoint(userId: bigint, dto: AppUserPointDto) {
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
}
