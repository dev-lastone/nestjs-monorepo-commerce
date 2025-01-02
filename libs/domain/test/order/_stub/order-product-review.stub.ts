import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { orderProductStub } from './order-product.stub';

const orderProductReview = OrderProductReview.create({
  orderProductId: orderProductStub.id,
  score: 5,
  description: '리뷰 내용은 최소 20자가 되야한다.',
});
orderProductReview.id = 1n;
export const orderProductReviewStub = orderProductReview;
