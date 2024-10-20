import { PickType } from '@nestjs/swagger';
import { CreateOrderProductReviewDto } from '@application/order/order.application.dto';

export class PostOrderProductsReviewReqDto extends PickType(
  CreateOrderProductReviewDto,
  ['score', 'description'],
) {}
