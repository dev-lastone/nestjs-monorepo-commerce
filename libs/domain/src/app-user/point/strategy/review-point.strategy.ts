import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { PointStrategy } from '@domain/app-user/point/strategy/point.strategy';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';

export class ReviewPointStrategy implements PointStrategy {
  private review: OrderProductReview;

  constructor(review: OrderProductReview) {
    this.review = review;
  }

  get userId() {
    return this.review.orderProduct.order.userId;
  }

  get action() {
    return AppUserPointHistoryAction.REVIEW;
  }

  get actionId() {
    return this.review.id;
  }

  get point() {
    return 1000;
  }

  get expirationAt() {
    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 100);
    return expirationAt;
  }
}
