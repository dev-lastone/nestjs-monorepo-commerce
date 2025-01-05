import { ReviewPointStrategy } from '@domain/app-user/point/strategy/review-point.strategy';
import { orderProductReviewStub } from '../order/_stub/order-product-review.stub';
import { orderProductWithOrderAndProductAndReviewStub } from '../order/_stub/order-product.stub';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';

it('ReviewPointStrategy', () => {
  const review = orderProductReviewStub;
  review.orderProduct = orderProductWithOrderAndProductAndReviewStub;
  const strategy = new ReviewPointStrategy(review);

  expect(strategy.userId).toBe(
    orderProductReviewStub.orderProduct.order.userId,
  );
  expect(strategy.action).toBe(AppUserPointHistoryAction.REVIEW);
  expect(strategy.actionId).toBe(orderProductReviewStub.id);
  expect(strategy.point).toBe(1000);
  expect(strategy.expirationAt).toBeInstanceOf(Date);
});
