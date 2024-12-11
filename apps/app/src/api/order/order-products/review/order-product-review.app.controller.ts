import { Body, Controller, Param, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '@common/decorator/user-id.decorator';
import { OrderProductReview } from '@domain/order/order-product-review.entity';
import { PostOrderProductsReviewReqDto } from './order-product-review.app.dto';
import { OrderService } from '@application/order/order.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products/:orderProductId/review')
export class OrderProductReviewAppController {
  constructor(private readonly orderService: OrderService) {}

  @Version('1')
  @Post()
  @ApiOkResponse({
    type: OrderProductReview,
  })
  async postOrderProductsReview(
    @UserId() userId: number,
    @Param('orderProductId') orderProductId: number,
    @Body() dto: PostOrderProductsReviewReqDto,
  ) {
    return await this.orderService.createOrderProductReview({
      userId,
      orderProductId,
      ...dto,
    });
  }
}
