import { PickType } from '@nestjs/swagger';
import { OrderProductReview } from '@domain/order/order-product-review.entity';

export class CreateOrderProductReviewDto extends PickType(OrderProductReview, [
  'score',
  'description',
]) {}
