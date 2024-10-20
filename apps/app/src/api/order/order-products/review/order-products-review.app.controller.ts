import { Controller, Param, ParseIntPipe, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '@common/decorator/user-id.decorator';
import { OrderProductReview } from '@domain/order/order-product-review';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products/:orderProductId/review')
export class OrderProductsReviewAppController {
  constructor() {}

  @Version('1')
  @Post()
  @ApiOkResponse({
    type: OrderProductReview,
  })
  postOrderProductsReview(
    @UserId() userId: number,
    @Param('orderProductId', new ParseIntPipe()) orderProductId: number,
  ) {}
}
