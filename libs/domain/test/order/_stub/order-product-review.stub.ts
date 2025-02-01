import { OrderProductReview } from '@domain/order/order-product-review.entity';

const orderProductReview = OrderProductReview.create({
  orderProductId: 1,
  score: 5,
  description: '리뷰 내용은 최소 20자가 되야한다.',
});
orderProductReview.id = 1;
export const orderProductReviewStub = orderProductReview;
