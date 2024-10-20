import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '@common/decorator/user-id.decorator';
import { OrderProductReview } from '@domain/order/order-product-review';
import { PostOrderProductsReviewReqDto } from './order-products-review.app.dto';
import { OrderApplicationService } from '@application/order/order.application.service';

@ApiBearerAuth('jwt')
@ApiTags('order')
@Controller('order-products/:orderProductId/review')
export class OrderProductsReviewAppController {
  constructor(
    private readonly orderApplicationService: OrderApplicationService,
  ) {}

  @Version('1')
  @Post()
  @ApiOkResponse({
    type: OrderProductReview,
  })
  postOrderProductsReview(
    @UserId() userId: number,
    @Param('orderProductId', new ParseIntPipe()) orderProductId: number,
    @Body() dto: PostOrderProductsReviewReqDto,
  ) {
    return this.orderApplicationService.createOrderProductReview({
      userId,
      orderProductId,
      ...dto,
    });
  }
}
